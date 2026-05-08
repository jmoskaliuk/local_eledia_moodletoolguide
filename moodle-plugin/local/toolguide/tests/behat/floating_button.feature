@local @local_toolguide @javascript
Feature: Floating Tool Guide quick-access button
  In order to reach the Tool Guide from anywhere in Moodle
  As a teacher
  I see a floating "M" button in the page footer that opens the Tool Guide.

  Background:
    Given the following "users" exist:
      | username | firstname | lastname | email                |
      | teacher1 | Tina      | Teacher  | teacher1@example.com |
      | student1 | Sam       | Student  | student1@example.com |
    And the following "courses" exist:
      | fullname | shortname |
      | Course 1 | C1        |
    And the following "course enrolments" exist:
      | user     | course | role           |
      | teacher1 | C1     | editingteacher |
      | student1 | C1     | student        |

  Scenario: Editing teacher sees the floating button on a course page
    Given I log in as "teacher1"
    And I am on "Course 1" course homepage
    Then ".local-toolguide-fab" "css_element" should exist

  Scenario: Editing teacher follows the floating button to the Tool Guide
    Given I log in as "teacher1"
    And I am on "Course 1" course homepage
    When I click on ".local-toolguide-fab" "css_element"
    Then I should see "Tool Guide" in the "page-header" "region"

  Scenario: Student does not see the floating button by default
    Given I log in as "student1"
    And I am on "Course 1" course homepage
    Then ".local-toolguide-fab" "css_element" should not exist

  Scenario: Floating button is suppressed on the Tool Guide page itself
    Given I log in as "teacher1"
    And I am on the "/local/toolguide/index.php" page
    Then ".local-toolguide-fab" "css_element" should not exist
