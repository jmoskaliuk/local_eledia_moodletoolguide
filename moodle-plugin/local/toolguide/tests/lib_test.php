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

defined('MOODLE_INTERNAL') || die();

global $CFG;
require_once($CFG->dirroot . '/local/toolguide/lib.php');

/**
 * Tests for local_toolguide/lib.php.
 *
 * @package    local_toolguide
 * @category   test
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers     ::local_toolguide_before_footer
 * @covers     ::local_toolguide_extend_navigation
 */
final class lib_test extends \advanced_testcase {
    /**
     * Build a $PAGE on a given course with a given pagelayout, and return
     * the affected user.
     *
     * @param string $pagelayout
     * @param string|null $url path used for $PAGE->url
     * @param string $archetype Role archetype used when enrolling the user.
     * @return \stdClass logged-in user
     */
    private function setup_page_for_user(
        string $pagelayout = 'standard',
        ?string $url = '/course/view.php',
        string $archetype = 'editingteacher',
    ): \stdClass {
        global $PAGE;

        $generator = $this->getDataGenerator();
        $course = $generator->create_course();
        $user = $generator->create_user();
        $generator->enrol_user($user->id, $course->id, $archetype);
        if ($archetype === 'editingteacher') {
            $context = \context_course::instance($course->id);
            $roles = get_archetype_roles($archetype);
            $role = reset($roles);
            role_change_permission($role->id, $context, 'local/toolguide:viewfab', CAP_ALLOW);
        }
        $this->setUser($user);

        $PAGE = new \moodle_page();
        $PAGE->set_context(\context_course::instance($course->id));
        $PAGE->set_pagelayout($pagelayout);
        $PAGE->set_url(new \moodle_url($url));
        $PAGE->set_course($course);

        return $user;
    }

    /**
     * Empty string is returned when nobody is logged in.
     */
    public function test_returns_empty_for_logged_out_user(): void {
        global $PAGE;
        $this->resetAfterTest();

        $course = $this->getDataGenerator()->create_course();
        $PAGE = new \moodle_page();
        $PAGE->set_context(\context_course::instance($course->id));
        $PAGE->set_pagelayout('standard');
        $PAGE->set_url(new \moodle_url('/course/view.php'));
        $PAGE->set_course($course);

        $this->setUser(null);

        $this->assertSame('', local_toolguide_before_footer());
    }

    /**
     * Empty string is returned for guest users.
     */
    public function test_returns_empty_for_guest(): void {
        global $PAGE;
        $this->resetAfterTest();

        $course = $this->getDataGenerator()->create_course();
        $PAGE = new \moodle_page();
        $PAGE->set_context(\context_course::instance($course->id));
        $PAGE->set_pagelayout('standard');
        $PAGE->set_url(new \moodle_url('/course/view.php'));
        $PAGE->set_course($course);

        $this->setGuestUser();

        $this->assertSame('', local_toolguide_before_footer());
    }

    /**
     * Empty string is returned for users without local/toolguide:viewfab.
     * Students do not have the capability by default (see db/access.php).
     */
    public function test_returns_empty_for_student_without_capability(): void {
        $this->resetAfterTest();

        $this->setup_page_for_user('standard', '/course/view.php', 'student');

        $this->assertSame('', local_toolguide_before_footer());
    }

    /**
     * Empty string on the Tool Guide page itself (no self-link).
     */
    public function test_returns_empty_on_toolguide_page(): void {
        $this->resetAfterTest();

        $this->setup_page_for_user('standard', '/local/toolguide/index.php');

        $this->assertSame('', local_toolguide_before_footer());
    }

    /**
     * Empty string on suppressed page layouts.
     *
     * @param string $layout Page layout to test.
     * @dataProvider suppressed_pagelayouts_provider
     */
    public function test_returns_empty_on_suppressed_pagelayouts(string $layout): void {
        $this->resetAfterTest();

        $this->setup_page_for_user($layout, '/course/view.php');

        $this->assertSame(
            '',
            local_toolguide_before_footer(),
            "Layout '$layout' should suppress the FAB."
        );
    }

    /**
     * Layouts on which the FAB is intentionally suppressed.
     *
     * @return array<string, array{string}>
     */
    public static function suppressed_pagelayouts_provider(): array {
        return [
            'embedded'    => ['embedded'],
            'print'       => ['print'],
            'maintenance' => ['maintenance'],
            'redirect'    => ['redirect'],
            'secure'      => ['secure'],
        ];
    }

    /**
     * On a standard page, an editing teacher sees the FAB and the returned
     * HTML contains the expected hook.
     */
    public function test_returns_fab_for_editing_teacher_on_standard_page(): void {
        $this->resetAfterTest();

        $this->setup_page_for_user('standard', '/course/view.php', 'editingteacher');

        $html = local_toolguide_before_footer();

        $this->assertNotSame('', $html, 'Editing teacher on a standard page should see the FAB.');
        $this->assertStringContainsString('local-toolguide-fab', $html);
        $this->assertStringContainsString('local-toolguide-fab__icon', $html);
        $this->assertStringContainsString('/local/toolguide/index.php', $html);
        $this->assertStringContainsString('aria-label=', $html);
        // Lucide life-buoy markers: outer and inner circle plus the four spokes.
        $this->assertStringContainsString('<svg', $html);
        $this->assertStringContainsString('<circle cx="12" cy="12" r="10"', $html);
        $this->assertStringContainsString('<circle cx="12" cy="12" r="4"', $html);
    }

    /**
     * Default FAB position is bottom-right when the site setting is unset.
     */
    public function test_fab_default_position_is_bottomright(): void {
        $this->resetAfterTest();

        $this->setup_page_for_user('standard', '/course/view.php', 'editingteacher');

        $html = local_toolguide_before_footer();

        $this->assertStringContainsString('local-toolguide-fab--bottomright', $html);
        $this->assertStringNotContainsString('local-toolguide-fab--bottomleft', $html);
    }

    /**
     * Setting fab_position to 'bottomleft' flips the modifier class.
     */
    public function test_fab_position_setting_bottomleft(): void {
        $this->resetAfterTest();

        set_config('fab_position', 'bottomleft', 'local_toolguide');

        $this->setup_page_for_user('standard', '/course/view.php', 'editingteacher');

        $html = local_toolguide_before_footer();

        $this->assertStringContainsString('local-toolguide-fab--bottomleft', $html);
        $this->assertStringNotContainsString('local-toolguide-fab--bottomright', $html);
    }

    /**
     * An invalid fab_position value falls back to bottom-right (defensive).
     */
    public function test_fab_position_invalid_falls_back_to_bottomright(): void {
        $this->resetAfterTest();

        set_config('fab_position', 'topcentre-something-bogus', 'local_toolguide');

        $this->setup_page_for_user('standard', '/course/view.php', 'editingteacher');

        $html = local_toolguide_before_footer();

        $this->assertStringContainsString('local-toolguide-fab--bottomright', $html);
    }

    /**
     * local_toolguide_get_locale_lang() maps current_language() to the four
     * supported app codes; anything unsupported falls back to 'en'.
     *
     * @param string $forcedlocale Locale injected into the Moodle session.
     * @param string $expected Expected app language code.
     * @dataProvider locale_lang_provider
     */
    public function test_get_locale_lang(string $forcedlocale, string $expected): void {
        $this->resetAfterTest();

        // Current_language() honours $SESSION->lang in tests.
        global $SESSION;
        $SESSION->lang = $forcedlocale;

        $this->assertSame($expected, local_toolguide_get_locale_lang());
    }

    /**
     * Locale mappings for the supported app languages.
     *
     * @return array<string, array{string,string}>
     */
    public static function locale_lang_provider(): array {
        return [
            'de'           => ['de', 'de'],
            'de_du'        => ['de_du', 'de'],
            'en'           => ['en', 'en'],
            'en_us'        => ['en_us', 'en'],
            'fr'           => ['fr', 'fr'],
            'es'           => ['es', 'es'],
            'es_mx'        => ['es_mx', 'es'],
            'unsupported_pl' => ['pl', 'en'],
            'unsupported_it' => ['it', 'en'],
            'unsupported_ja' => ['ja', 'en'],
        ];
    }

    /**
     * Empty string on /login/ pages even for capable users.
     */
    public function test_returns_empty_on_login_path(): void {
        $this->resetAfterTest();

        $this->setup_page_for_user('standard', '/login/index.php', 'editingteacher');

        $this->assertSame('', local_toolguide_before_footer());
    }

    /*
     * The previous test_extend_navigation_adds_node_for_capable_user() test
     * was removed in v1.1.37 alongside the legacy
     * local_toolguide_extend_navigation() callback. The Tool Guide is now
     * reached exclusively via the floating quick-access button (covered by
     * tests above) and via direct URL.
     */
}
