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
 * Site administration settings for local_toolguide.
 *
 * Currently exposes:
 *  - fab_position: where the floating Tool Guide button sits on every page
 *    (bottomright | bottomleft). Default: bottomright.
 *
 * @package    local_toolguide
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $settings = new admin_settingpage(
        'local_toolguide',
        get_string('settings_pagetitle', 'local_toolguide')
    );

    $ADMIN->add('localplugins', $settings);

    $settings->add(new admin_setting_configselect(
        'local_toolguide/fab_position',
        get_string('settings_fab_position', 'local_toolguide'),
        get_string('settings_fab_position_desc', 'local_toolguide'),
        'bottomright',
        [
            'bottomright' => get_string('settings_fab_position_bottomright', 'local_toolguide'),
            'bottomleft'  => get_string('settings_fab_position_bottomleft', 'local_toolguide'),
        ]
    ));
}
