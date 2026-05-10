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
 * English language strings.
 *
 * @package    local_toolguide
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$string['pluginname'] = 'Moodle Tool Guide';
$string['toolguide'] = 'Tool Guide';
$string['toolguide:view'] = 'View Tool Guide';
$string['toolguide:viewfab'] = 'See the floating Tool Guide button on every page';
$string['pagetitle'] = 'Moodle Tool Guide – Interactive';
$string['pagedesc'] = 'Find the right Moodle activity for your didactic goal.';
$string['fab_title'] = 'Open the Moodle Tool Guide';
$string['fab_label'] = 'Moodle Tool Guide';
$string['privacy:metadata'] = 'The Moodle Tool Guide plugin does not store any personal data.';

// Site settings (admin → Plugins → Local plugins → Tool Guide).
$string['settings_pagetitle'] = 'Moodle Tool Guide';
$string['settings_fab_position'] = 'Floating button position';
$string['settings_fab_position_desc'] = 'Where the floating Tool Guide quick-access button is anchored on every page. Visible only to users with the local/toolguide:viewfab capability.';
$string['settings_fab_position_bottomright'] = 'Bottom right';
$string['settings_fab_position_bottomleft'] = 'Bottom left';

// React app user interface strings.
$string['ui_title'] = 'Moodle Tool Guide';
$string['ui_subtitle'] = 'Find the right tool for your didactic goal';
$string['ui_guide_intro'] = 'This Moodle Tool Guide provides a compact overview and comparison of activities and resources in Moodle. It supports the selection of suitable tools based on didactic goals or available time. All tools are classified according to Benjamin Bloom\'s taxonomy of learning objectives. It is intended for teachers, trainers and education professionals.';
$string['ui_bloom_intro'] = 'Benjamin Bloom\'s taxonomy of learning objectives arranges learning into levels of cognitive depth. It helps formulate learning objectives clearly, make competence levels more visible and structure learning units accordingly. It remains a central reference model in didactics and education.';
$string['ui_info_toolguide'] = 'About the Tool Guide';
$string['ui_info_bloom'] = 'What does Bloom mean?';
$string['ui_matrix_goal_axis'] = 'What do you want to achieve (didactically)?';
$string['ui_matrix_tool_axis'] = 'What can you use (technically)?';
$string['ui_matrix_reading_show'] = 'Read matrix';
$string['ui_matrix_reading_hide'] = 'Hide reading arrows';
$string['ui_matrix_reading_hint'] = 'Shows the reading directions: didactic goals horizontally, technical choice vertically.';
$string['ui_a11y_open_tool_details'] = 'Open details for {name}';
$string['ui_nav_matrix'] = 'Matrix';
$string['ui_nav_cards'] = 'Cards';
$string['ui_nav_wizard'] = 'Wizard';
$string['ui_search_placeholder'] = 'Search tool…';
$string['ui_compare_btn'] = 'Compare';
$string['ui_compare_new'] = 'Start new comparison';
$string['ui_filter_setup_all'] = 'Setup effort: all';
$string['ui_filter_support_all'] = 'Support effort: all';
$string['ui_filter_goal_default'] = 'Well suited for …';
$string['ui_filter_bloom_all'] = '🎓 Bloom: all levels';
$string['ui_filter_bloom_from'] = 'from level';
$string['ui_setup'] = 'Setup';
$string['ui_setup_help'] = 'How much effort does it take to ONE-TIME create and configure this activity?';
$string['ui_support'] = 'Support';
$string['ui_support_help'] = 'How much ongoing effort is needed DURING use – moderating, grading, replying?';
$string['ui_setup_einfach'] = 'Easy';
$string['ui_setup_mittel'] = 'Medium';
$string['ui_setup_komplex'] = 'Complex';
$string['ui_support_gering'] = 'Low';
$string['ui_support_mittel'] = 'Medium';
$string['ui_support_hoch'] = 'High';
$string['ui_activity'] = 'Activity';
$string['ui_bloom_short'] = 'Bloom';
$string['ui_bloom_help'] = 'Which cognitive learning levels of Bloom\'s Taxonomy does this activity typically support? 1=Remember, 6=Create.';
$string['ui_suit_good'] = 'Well suited';
$string['ui_suit_partial'] = 'Partially suited';
$string['ui_suit_bad'] = 'Not suited';
$string['ui_empty_title'] = 'No matching activities found';
$string['ui_empty_text'] = 'There is no Moodle activity that matches the selected combination. Loosen one or more filters to see suggestions – or try the Wizard for a guided selection.';
$string['ui_empty_reset'] = 'Reset filters';
$string['ui_wizard_step1'] = 'Goal';
$string['ui_wizard_step2'] = 'Setup';
$string['ui_wizard_step3'] = 'Support';
$string['ui_wizard_step4'] = 'Bloom';
$string['ui_wizard_q1'] = 'What do you want to achieve?';
$string['ui_wizard_q2'] = 'How much setup effort is acceptable?';
$string['ui_wizard_q3'] = 'How much ongoing support effort is acceptable?';
$string['ui_wizard_results'] = 'matching tools found';
$string['ui_wizard_back'] = 'Back';
$string['ui_wizard_restart'] = 'Start over';
$string['ui_wizard_skip'] = 'Any';
$string['ui_wizard_skip_desc'] = 'Doesn\'t matter';
$string['ui_overview'] = 'Overview';
$string['ui_suitability_header'] = 'Suitability by didactic goal';
$string['ui_docs_btn'] = 'Moodle Docs';
$string['ui_community_btn'] = 'More ideas at eledia.community';
$string['ui_in_compare'] = '✓ In comparison';
$string['ui_add_compare'] = '+ Compare';
$string['ui_description'] = 'Description';
$string['ui_repo_btn'] = 'Source on GitHub';
$string['ui_footer'] = 'Based on the Moodle Tool Guide · eLeDia · Idea: Joyce Seitzinger';
$string['ui_wizard_step5'] = 'Result';
$string['ui_wizard_q4'] = 'Minimum Bloom level?';
$string['ui_credit_original'] = 'Original concept';
$string['ui_credit_translation'] = 'Based on a translation by';
$string['ui_credit_translators_extras'] = ', Susanne Gebauer and Gerald Hartwig';
$string['ui_dialog_close'] = 'Close';
$string['ui_credit_license'] = 'License';
$string['ui_credit_eledia'] = 'Adapted by the Moodle experts of eLeDia | eLearning im Dialog. More Moodle know-how at';
$string['ui_wizard_breadcrumb'] = 'Wizard steps';
$string['ui_wizard_jump_to'] = 'Back to step';
$string['ui_a11y_font_larger'] = 'Larger text';
$string['ui_a11y_font_smaller'] = 'Smaller text';
$string['ui_a11y_font_reset'] = 'Reset text size';
$string['ui_alt_eledia_logo'] = 'eLeDia – eLearning im Dialog';
$string['ui_alt_eledia_favicon'] = 'eLeDia logo';
$string['ui_alt_moodle_partner'] = 'Moodle Premium Certified Services Provider';
$string['ui_alt_github'] = 'Source on GitHub';
$string['ui_alt_cc_byncsa'] = 'License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International';
$string['ui_skip_to_content'] = 'Skip to content';
$string['ui_a11y_font_group'] = 'Text size';
$string['ui_language'] = 'Language';
$string['ui_views'] = 'Views';
$string['ui_search'] = 'Search';
$string['ui_matrix_aria'] = 'Moodle Tool Guide matrix';
$string['ui_bloom_level_1'] = 'Remember';
$string['ui_bloom_level_2'] = 'Understand';
$string['ui_bloom_level_3'] = 'Apply';
$string['ui_bloom_level_4'] = 'Analyze';
$string['ui_bloom_level_5'] = 'Evaluate';
$string['ui_bloom_level_6'] = 'Create';
$string['ui_bloom_desc_1'] = 'Recall facts and basic concepts.';
$string['ui_bloom_desc_2'] = 'Explain ideas or concepts in your own words.';
$string['ui_bloom_desc_3'] = 'Use information in new situations.';
$string['ui_bloom_desc_4'] = 'Draw connections among ideas.';
$string['ui_bloom_desc_5'] = 'Justify a stand or decision based on the material.';
$string['ui_bloom_desc_6'] = 'Produce new or original work.';
$string['ui_goal_info_label'] = 'Information & Transfer';
$string['ui_goal_info_q'] = 'Is it suitable for delivering information?';
$string['ui_goal_bewerten_label'] = 'Assessment';
$string['ui_goal_bewerten_q'] = 'Does it allow measuring knowledge?';
$string['ui_goal_komm_label'] = 'Communication & Interaction';
$string['ui_goal_komm_q'] = 'Can it be used for communication?';
$string['ui_goal_collab_label'] = 'Collaborative Creation';
$string['ui_goal_collab_q'] = 'Can content be created cooperatively?';
$string['ui_goal_bloomg_label'] = 'Bloom\'s Learning Goals';
$string['ui_goal_bloomg_q'] = 'Which learning goals are supported?';
$string['ui_purpose_administration'] = 'Administration';
$string['ui_purpose_assessment'] = 'Assessment';
$string['ui_purpose_collaboration'] = 'Collaboration';
$string['ui_purpose_communication'] = 'Communication';
$string['ui_purpose_interactivecontent'] = 'Interactive content';
$string['ui_purpose_content'] = 'Resources';
