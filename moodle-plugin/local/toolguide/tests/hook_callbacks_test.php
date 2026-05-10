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
 * Tests for the typed Moodle 4.4+ hook callback.
 *
 * Verifies that {@see hook_callbacks::before_footer_html_generation()}
 * forwards the HTML produced by the legacy
 * {@see local_toolguide_before_footer()} into the hook object via
 * {@see \core\hook\output\before_footer_html_generation::add_html()}.
 *
 * @package    local_toolguide
 * @category   test
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers     \local_toolguide\hook_callbacks
 */
final class hook_callbacks_test extends \advanced_testcase {
    /**
     * Skip the entire suite when running against Moodle < 4.4 (the new
     * hook system is not yet present then).
     */
    protected function setUp(): void {
        parent::setUp();
        if (!class_exists(\core\hook\output\before_footer_html_generation::class)) {
            $this->markTestSkipped('Hook system not available before Moodle 4.4.');
        }
    }

    /**
     * For an editing teacher on a standard page the callback adds non-empty
     * HTML to the hook.
     */
    public function test_callback_adds_html_for_editing_teacher(): void {
        global $PAGE;
        $this->resetAfterTest();

        $generator = $this->getDataGenerator();
        $course = $generator->create_course();
        $user = $generator->create_user();
        $generator->enrol_user($user->id, $course->id, 'editingteacher');
        $this->setUser($user);

        $PAGE = new \moodle_page();
        $PAGE->set_context(\context_course::instance($course->id));
        $PAGE->set_pagelayout('standard');
        $PAGE->set_url(new \moodle_url('/course/view.php'));
        $PAGE->set_course($course);

        $hook = new \core\hook\output\before_footer_html_generation($PAGE);
        hook_callbacks::before_footer_html_generation($hook);

        $html = $hook->get_output();
        $this->assertStringContainsString('local-toolguide-fab', $html);
        $this->assertStringContainsString('/local/toolguide/index.php', $html);
    }

    /**
     * For a guest user on a standard page the callback does NOT add HTML.
     */
    public function test_callback_adds_nothing_for_guest(): void {
        global $PAGE;
        $this->resetAfterTest();

        $course = $this->getDataGenerator()->create_course();

        $this->setGuestUser();

        $PAGE = new \moodle_page();
        $PAGE->set_context(\context_course::instance($course->id));
        $PAGE->set_pagelayout('standard');
        $PAGE->set_url(new \moodle_url('/course/view.php'));
        $PAGE->set_course($course);

        $hook = new \core\hook\output\before_footer_html_generation($PAGE);
        hook_callbacks::before_footer_html_generation($hook);

        $this->assertSame(
            '',
            $hook->get_output(),
            'Guest users should not see any FAB HTML injected.'
        );
    }
}
