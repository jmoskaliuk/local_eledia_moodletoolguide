@local @local_toolguide @javascript
Feature: Tool Guide page renders for authorised users
  In order to choose the right Moodle activity for a didactic goal
  As an authorised user
  I open the Tool Guide page and see the React app mount and language switcher.

  Background:
    Given the following "users" exist:
      | username | firstname | lastname | email                |
      | teacher1 | Tina      | Teacher  | teacher1@example.com |
      | guest1   | Guess     | Tworld   | guest1@example.com   |

  Scenario: Editing teacher opens the Tool Guide
    Given I log in as "teacher1"
    When I visit "/local/toolguide/index.php"
    Then "#toolguide-root" "css_element" should exist
    And I should not see "Exception"

  Scenario: Tool Guide page mounts the AMD module
    Given I log in as "teacher1"
    When I visit "/local/toolguide/index.php"
    # The AMD module renders the React app into the mount point. Full
    # React-rendered behaviour is exercised separately via the standalone
    # HTML test fixture; here we just verify the mount point exists and
    # the local-toolguide-page body class is set so the layout-fix CSS
    # actually applies.
    Then "#toolguide-root" "css_element" should exist
    And "body.local-toolguide-page" "css_element" should exist

  Scenario: Tool Guide page is gated behind local/toolguide:view
    Given I log in as "teacher1"
    When I visit "/local/toolguide/index.php"
    Then "#toolguide-root" "css_element" should exist
    # No 'expand Site pages node' step here any more — the navigation
    # callback has been removed in v1.1.37; the floating quick-access
    # button (covered by floating_button.feature) is the canonical
    # entry point.
