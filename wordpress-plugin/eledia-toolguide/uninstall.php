<?php
/**
 * Uninstall handler for eLeDia Moodle Tool Guide.
 *
 * Called by WordPress when the user clicks "Delete" on the plugin page.
 * The plugin stores no options, no custom tables and no post meta — so
 * there is literally nothing to clean up. We keep this file anyway as a
 * hook point in case future versions add persistent data.
 *
 * @package EledialToolguide
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

// Intentionally empty: no options, no tables, no meta to remove.
