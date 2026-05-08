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

/**
 * Hook callback registrations for local_toolguide.
 *
 * Moodle 4.4+ replaces several legacy lib.php callbacks (before_footer,
 * before_http_headers, ...) with a typed hook system. This file registers
 * the modern hook callback for the floating Moodle Tool Guide quick-access
 * button. The legacy local_toolguide_before_footer() function in lib.php
 * is retained for older Moodle versions; on 4.4+, Moodle's hook manager
 * automatically skips the legacy callback once the modern hook is present
 * (see core\hook\manager::is_deprecating_hook_present()).
 *
 * @package    local_toolguide
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$callbacks = [
    [
        'hook' => \core\hook\output\before_footer_html_generation::class,
        'callback' => '\local_toolguide\hook_callbacks::before_footer_html_generation',
    ],
];
