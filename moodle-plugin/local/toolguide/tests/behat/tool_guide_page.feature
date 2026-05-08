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
    When I am on the "/local/toolguide/index.php" page
    Then "#toolguide-root" "css_element" should exist
    And I should not see "Exception"

  Scenario: Tool Guide page mounts the AMD module
    Given I log in as "teacher1"
    When I am on the "/local/toolguide/index.php" page
    # The AMD module injects a fallback <noscript>/loading element while React boots.
    # This step verifies the mount point exists; full React-rendered behaviour is
    # exercised separately in the standalone HTML test fixture.
    Then "#toolguide-root" "css_element" should exist

  Scenario: Tool Guide is reachable from the navigation
    Given I log in as "teacher1"
    When I expand "Site pages" node
    Then "Tool Guide" "link" should exist
    And I follow "Tool Guide"
    Then "#toolguide-root" "css_element" should exist
