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
 * Tool Guide main page.
 *
 * @package    local_toolguide
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../config.php');

$context = context_system::instance();
require_login();
require_capability('local/toolguide:view', $context);

$PAGE->set_context($context);
$PAGE->set_url(new moodle_url('/local/toolguide/index.php'));
$PAGE->set_title(get_string('pagetitle', 'local_toolguide'));
$PAGE->set_heading(get_string('pagetitle', 'local_toolguide'));
$PAGE->set_pagelayout('standard');

// Load React and Babel from CDN.
$PAGE->requires->js(new moodle_url('https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js'), true);
$PAGE->requires->js(new moodle_url('https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js'), true);

echo $OUTPUT->header();
echo $OUTPUT->heading(get_string('pagedesc', 'local_toolguide'));

// Container for the React app.
echo '<div id="toolguide-root" style="min-height:600px;"></div>';

// Inline the app JS (pre-compiled, no Babel needed at runtime).
echo '<script src="' . (new moodle_url('/local/toolguide/amd/src/toolguide.js'))->out() . '"></script>';

echo $OUTPUT->footer();
