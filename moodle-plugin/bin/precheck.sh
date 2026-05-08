#!/usr/bin/env bash
# ============================================================================
# precheck.sh — run moodle-plugin-ci against local_toolguide
# ============================================================================
# Mirrors the GitHub-Actions matrix below (.github/workflows/moodle-ci.yml)
# locally so "lokal grün" == "remote grün".
#
# Requires: bin/setup-plugin-ci.sh has been run once.
#
# Usage:
#   bash moodle-plugin/bin/precheck.sh                  # all checks against
#                                                      # ~/.moodle-plugin-ci/moodle
#   bash moodle-plugin/bin/precheck.sh --moodle 4.5    # pin Moodle branch
#   bash moodle-plugin/bin/precheck.sh --only phpcs    # single check
#   bash moodle-plugin/bin/precheck.sh --with-behat    # + Behat (slow, opt-in)
#   bash moodle-plugin/bin/precheck.sh --verbose       # show full output
# ============================================================================

set -euo pipefail

# ---------- defaults ----------
PLUGIN_DIR="$(cd "$(dirname "$0")/.." && pwd)/local/toolguide"
CI_DIR="${MOODLE_PLUGIN_CI_DIR:-$HOME/.moodle-plugin-ci}"
MOODLE_BRANCH="MOODLE_405_STABLE"   # Moodle 4.5 LTS by default
DB_TYPE="${MOODLE_DB_TYPE:-pgsql}"  # pgsql or mariadb
ONLY=""
WITH_BEHAT=false
VERBOSE=false

# ---------- arg parsing ----------
while [[ $# -gt 0 ]]; do
    case "$1" in
        --moodle)
            case "$2" in
                4.5|405) MOODLE_BRANCH="MOODLE_405_STABLE" ;;
                5.0|500) MOODLE_BRANCH="MOODLE_500_STABLE" ;;
                5.1|501) MOODLE_BRANCH="MOODLE_501_STABLE" ;;
                *) echo "Unknown Moodle version: $2 (use 4.5 / 5.0 / 5.1)" >&2; exit 2 ;;
            esac
            shift 2 ;;
        --db) DB_TYPE="$2"; shift 2 ;;
        --only) ONLY="$2"; shift 2 ;;
        --with-behat) WITH_BEHAT=true; shift ;;
        --verbose|-v) VERBOSE=true; shift ;;
        --plugin) PLUGIN_DIR="$2"; shift 2 ;;
        --help|-h)
            sed -n '2,20p' "$0"
            exit 0 ;;
        *) echo "Unknown arg: $1" >&2; exit 2 ;;
    esac
done

if [ ! -d "$CI_DIR/vendor/bin" ]; then
    echo "ERROR: moodle-plugin-ci not installed. Run bin/setup-plugin-ci.sh first." >&2
    exit 1
fi

if [ ! -d "$PLUGIN_DIR" ]; then
    echo "ERROR: plugin not found at $PLUGIN_DIR" >&2
    exit 1
fi

MPCI="$CI_DIR/vendor/bin/moodle-plugin-ci"
MOODLE_DIR="$CI_DIR/moodle-$MOODLE_BRANCH"

# ---------- colors ----------
if [ -t 1 ]; then
    GREEN=$'\033[0;32m'; RED=$'\033[0;31m'; YELLOW=$'\033[1;33m'
    BLUE=$'\033[0;34m'; BOLD=$'\033[1m'; NC=$'\033[0m'
else
    GREEN=""; RED=""; YELLOW=""; BLUE=""; BOLD=""; NC=""
fi

PASS=0; WARN=0; FAIL=0; SKIP=0

run_check() {
    local name="$1"; shift
    local mode="$1"; shift   # "FAIL" or "WARN"

    if [ -n "$ONLY" ] && [ "$ONLY" != "$name" ]; then
        return
    fi

    echo
    echo "${BOLD}${BLUE}▶ $name${NC}"

    if [ "$VERBOSE" = true ]; then
        if "$@"; then
            echo "${GREEN}✓ $name PASS${NC}"; PASS=$((PASS+1))
        else
            if [ "$mode" = "WARN" ]; then
                echo "${YELLOW}⚠ $name WARN${NC}"; WARN=$((WARN+1))
            else
                echo "${RED}✗ $name FAIL${NC}"; FAIL=$((FAIL+1))
            fi
        fi
    else
        local out
        if out=$("$@" 2>&1); then
            echo "${GREEN}✓ $name PASS${NC}"; PASS=$((PASS+1))
        else
            if [ "$mode" = "WARN" ]; then
                echo "${YELLOW}⚠ $name WARN${NC}"; WARN=$((WARN+1))
                echo "$out" | sed 's/^/  /'
            else
                echo "${RED}✗ $name FAIL${NC}"; FAIL=$((FAIL+1))
                echo "$out" | sed 's/^/  /'
            fi
        fi
    fi
}

# ---------- bootstrap Moodle codebase ----------
if [ ! -d "$MOODLE_DIR" ]; then
    echo "${BOLD}==> bootstrapping Moodle ($MOODLE_BRANCH) under $MOODLE_DIR${NC}"
    git clone --depth=1 --branch "$MOODLE_BRANCH" \
        https://github.com/moodle/moodle.git "$MOODLE_DIR"
fi

cd "$MOODLE_DIR"

# ---------- moodle-plugin-ci install (sets up a small Moodle for validate/etc) ----------
echo "${BOLD}==> moodle-plugin-ci install${NC}"
"$MPCI" install \
    --plugin "$PLUGIN_DIR" \
    --db-type "$DB_TYPE" \
    --moodle "$MOODLE_DIR" \
    --no-init || {
        echo "${RED}install step failed — see above${NC}" >&2
        exit 1
    }

# ---------- the checks ----------
run_check "phplint"     FAIL   "$MPCI" phplint
run_check "phpmd"       WARN   "$MPCI" phpmd
run_check "phpcs"       FAIL   "$MPCI" phpcs --max-warnings 0
run_check "phpdoc"      FAIL   "$MPCI" phpdoc --max-warnings 0
run_check "validate"    FAIL   "$MPCI" validate
run_check "savepoints"  FAIL   "$MPCI" savepoints
run_check "mustache"    FAIL   "$MPCI" mustache
run_check "grunt"       WARN   "$MPCI" grunt --max-lint-warnings 0
run_check "phpunit"     FAIL   "$MPCI" phpunit --fail-on-warning

if [ "$WITH_BEHAT" = true ]; then
    run_check "behat" FAIL "$MPCI" behat --profile chrome
else
    SKIP=$((SKIP+1))
    [ -z "$ONLY" ] && echo
    [ -z "$ONLY" ] && echo "${YELLOW}⊘ behat SKIP${NC} (use --with-behat to run)"
fi

# ---------- summary ----------
echo
echo "${BOLD}==================================================${NC}"
echo "${BOLD}  moodle-plugin-ci summary (Moodle: $MOODLE_BRANCH, DB: $DB_TYPE)${NC}"
echo "${BOLD}==================================================${NC}"
printf "  ${GREEN}PASS${NC}: %d   ${YELLOW}WARN${NC}: %d   ${RED}FAIL${NC}: %d   ${YELLOW}SKIP${NC}: %d\n" "$PASS" "$WARN" "$FAIL" "$SKIP"

if [ "$FAIL" -eq 0 ]; then
    echo "${GREEN}${BOLD}  → READY${NC}"
    exit 0
else
    echo "${RED}${BOLD}  → NOT READY (fix FAILs above)${NC}"
    exit 1
fi
