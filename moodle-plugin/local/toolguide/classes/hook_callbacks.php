<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace local_toolguide;

/**
 * Hook callbacks for local_toolguide.
 *
 * Migrated from the legacy lib.php callback `local_toolguide_before_footer()`
 * to the typed Moodle 4.4+ hook system.
 *
 * @package    local_toolguide
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class hook_callbacks {
    /**
     * Inject the floating "Moodle M" quick-access button into the page footer.
     *
     * Replaces the legacy `local_toolguide_before_footer()` callback. The
     * actual rendering logic continues to live in lib.php so that older
     * Moodle versions (4.1–4.3) can still use the legacy callback path.
     *
     * @param \core\hook\output\before_footer_html_generation $hook
     */
    public static function before_footer_html_generation(
        \core\hook\output\before_footer_html_generation $hook,
    ): void {
        global $CFG;

        // Reuse the legacy implementation so we have one source of truth.
        require_once($CFG->dirroot . '/local/toolguide/lib.php');

        $html = \local_toolguide_before_footer();

        if ($html !== '') {
            $hook->add_html($html);
        }
    }
}
