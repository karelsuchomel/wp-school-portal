<?php
/**
 * WordPress compatbility warnings
 *
 * Prevents portal from running on WordPress versions without the REST API,
 * since this theme requires API functionality. If this file is loaded,
 * we know we have an incompatible WordPress.
 */

/**
 * Prevent switching to portal on old versions of WordPress.
 *
 * Switches to the default theme.
 */
function switch_theme_to_default() {
	switch_theme( WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', 'switching_to_default_theme_notice' );
}
add_action( 'after_switch_theme', 'switch_theme_to_default' );

/**
 * Adds a message for unsuccessful theme switch.
 *
 * Prints an update nag after an unsuccessful attempt to switch on WordPress versions prior to 4.7.
 */
function switching_to_default_theme_notice() {
	$message = __( 'School portal requires WordPress 4.7 or higher. Please update WordPress and try again.' );
	printf( '<div class="error"><p>%s</p></div>', $message );
}

/**
 * Prevents the Customizer from being loaded on WordPress versions prior to 4.7.
 *
 * @since Foxhound 1.0
 */
function foxhound_customize() {
	wp_die( __( 'Foxhound requires WordPress 4.7 or higher. Please update your site and try again.', 'foxhound' ), '', array(
		'back_link' => true,
	) );
}
add_action( 'load-customize.php', 'foxhound_customize' );

/**
 * Prevents the Theme Preview from being loaded on WordPress versions prior to 4.7.
 *
 * @since Foxhound 1.0
 */
function foxhound_preview() {
	if ( isset( $_GET['preview'] ) ) {
		wp_die( __( 'Foxhound requires WordPress 4.7 or higher. Please update your site and try again.', 'foxhound' ) );
	}
}
add_action( 'template_redirect', 'foxhound_preview' );
