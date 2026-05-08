#!/usr/bin/env bash
# ============================================================================
# setup-plugin-ci.sh — install moodle-plugin-ci ^4 into ~/.moodle-plugin-ci/
# ============================================================================
# Run this ONCE per developer machine.
# Pulls the standard tooling: phpcs, phpdoc, phpmd, gherkinlint, mustache lint,
# the Moodle codestyle, plus a bootstrap mechanism that installs a tiny Moodle
# under ~/.moodle-plugin-ci/moodle for the validate / savepoints / phpunit
# stages.
#
# Companion script: bin/precheck.sh runs the actual checks against the plugin.
# ============================================================================

set -euo pipefail

CI_DIR="${MOODLE_PLUGIN_CI_DIR:-$HOME/.moodle-plugin-ci}"

if [ -d "$CI_DIR" ] && [ -f "$CI_DIR/vendor/bin/moodle-plugin-ci" ]; then
    echo "moodle-plugin-ci is already installed at $CI_DIR"
    "$CI_DIR/vendor/bin/moodle-plugin-ci" --version || true
    exit 0
fi

if ! command -v composer >/dev/null 2>&1; then
    echo "ERROR: composer not found on PATH. Install Composer first." >&2
    echo "  https://getcomposer.org/download/" >&2
    exit 1
fi

if ! command -v php >/dev/null 2>&1; then
    echo "ERROR: php not found on PATH. PHP 8.1+ is required for Moodle 4.5+." >&2
    exit 1
fi

PHP_MAJOR_MINOR=$(php -r 'echo PHP_MAJOR_VERSION.".".PHP_MINOR_VERSION;')
case "$PHP_MAJOR_MINOR" in
    8.1|8.2|8.3|8.4) ;;
    *)
        echo "WARN: PHP $PHP_MAJOR_MINOR detected. Moodle 4.5/5.0 prefer 8.1–8.3, 5.1 wants 8.2+." >&2
        ;;
esac

mkdir -p "$CI_DIR"
cd "$CI_DIR"

echo "==> creating moodle-plugin-ci ^4 project under $CI_DIR"
composer create-project -n --no-dev --no-progress --prefer-dist \
    moodlehq/moodle-plugin-ci ci ^4

ln -sfn "$CI_DIR/ci/vendor/bin/moodle-plugin-ci" "$CI_DIR/vendor/bin/moodle-plugin-ci" 2>/dev/null || \
    mkdir -p "$CI_DIR/vendor/bin" && \
    ln -sfn "$CI_DIR/ci/vendor/bin/moodle-plugin-ci" "$CI_DIR/vendor/bin/moodle-plugin-ci"

echo
echo "==> installed:"
"$CI_DIR/vendor/bin/moodle-plugin-ci" --version

echo
echo "Next: run 'bash moodle-plugin/bin/precheck.sh' against the plugin."
