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

use core_privacy\local\metadata\null_provider;

/**
 * Tests for the null privacy provider.
 *
 * The Tool Guide stores no personal data, so its privacy provider must be
 * a {@see null_provider} and the language string referenced by it must be
 * defined for every shipped language pack.
 *
 * @package    local_toolguide
 * @category   test
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers     \local_toolguide\privacy\provider
 */
final class privacy_provider_test extends \advanced_testcase {
    /**
     * Provider implements the null_provider interface.
     */
    public function test_provider_implements_null_provider(): void {
        $this->assertTrue(
            is_subclass_of(\local_toolguide\privacy\provider::class, null_provider::class),
            'Privacy provider should implement core_privacy\local\metadata\null_provider.'
        );
    }

    /**
     * The language string returned by get_reason() exists in en and de
     * (and is non-empty), so the GDPR report renders a real explanation.
     */
    public function test_get_reason_string_is_defined(): void {
        $reasonkey = \local_toolguide\privacy\provider::get_reason();
        $this->assertNotEmpty($reasonkey);

        // Force-load the en string. If the key is missing, get_string emits
        // a debugging() and returns "[[$reasonkey]]" — assert against that.
        $reason = get_string($reasonkey, 'local_toolguide');
        $this->assertStringNotContainsString(
            '[[',
            $reason,
            "Language string '$reasonkey' should be defined for local_toolguide."
        );

        // German must also be present.
        $reasonde = get_string_manager()->get_string($reasonkey, 'local_toolguide', null, 'de');
        $this->assertStringNotContainsString(
            '[[',
            $reasonde,
            "German language string '$reasonkey' should be defined for local_toolguide."
        );
    }
}
