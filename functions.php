<?php
/**
 * school portal functions and definitions
 *
 * @package school_portal
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '0.0.1' );
}

if ( ! function_exists( 'school_portal_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function school_portal_setup() {
		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'school-portal' ),
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'school_portal_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);
		
		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
		
		add_theme_support( 'disable-custom-font-sizes' );
        add_theme_support( 'disable-custom-colors' );
        add_theme_support( 'disable-custom-gradients' );
        add_theme_support( 'editor-styles' );
        add_theme_support( 'wp-block-styles' );
        add_editor_style( get_template_directory_uri() . '/assets/css/admin.css' );
	}
endif;
add_action( 'after_setup_theme', 'school_portal_setup' );

/**
 * Enqueue scripts and styles.
 */
function school_portal_scripts() {
    /* Used just to describe the theme */
	wp_enqueue_style( 'school-portal-style', get_stylesheet_uri(), array(), _S_VERSION );

    /* Actual CSS styling */
    wp_enqueue_style( 'sp-style', get_template_directory_uri() . '/assets/css/bundle.css', array(), _S_VERSION );

    wp_enqueue_script( 'sp-javascript', get_template_directory_uri() . '/assets/js/bundle.js', array(), _S_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'school_portal_scripts' );

/**
 * Additional configuration.
 */

// remove WordPress emojis
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

// remove unused menu items
function my_remove_menu_pages() {
	remove_menu_page( 'index.php' ); 				// Dashboard
	remove_menu_page( 'edit-comments.php' );		//Comments
}
add_action( 'admin_menu', 'my_remove_menu_pages' );

// TODO: Enqueue block editor scripts and styles
// require get_template_directory() . '/inc/custom-blocks/block-editor-scripts.php';