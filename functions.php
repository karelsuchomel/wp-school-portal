<?php
// school portal functions and definitions
// @package school_portal

// Only works if the REST API is available
if ( version_compare( $GLOBALS['wp_version'], '4.7', '<' ) ) {
	require get_template_directory() . '/inc/compat-warnings.php';
	return;
}

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '0.0.1' );
}

if ( ! function_exists( 'school_portal_setup' ) ) :
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
    wp_enqueue_style( 'sp-style', get_template_directory_uri() . '/dist/css/client.css', array(), _S_VERSION );

    wp_enqueue_script( 'sp-javascript', get_template_directory_uri() . '/dist/js/client.js', array(), _S_VERSION, true );
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


class preload_navigation {
    // Set up actions
	public function __construct() {
		add_filter( 'wp_enqueue_scripts', array( $this, 'print_data' ) );
	}

	// Adds the json-string data to the react app script
	public function print_data() {
		$navigation_header_data = sprintf(
			'const navigationHeaderData = %s;',
			$this->add_json_data()
		);
		wp_add_inline_script( FOXHOUND_APP, $navigation_header_data, 'before' );
	}

	/**
	 * Dumps the current query response as a JSON-encoded string
	 */
	public function add_json_data() {
		return wp_json_encode( array(
			'enabled' => class_exists( 'WP_REST_Menus' ),
			'data' => $this->get_navigation_header_data(),
		) );
	}

	/**
	 * Gets menu data from the JSON API server
	 *
	 * @return array
	 */
	public function get_navigation_header_data() {
		$menu = array();

		$request = new \WP_REST_Request();
		$request['context'] = 'view';
		$request['location'] = 'primary';

		if ( class_exists( 'WP_REST_Menus' ) ) {
			$menu_api = new WP_REST_Menus();
			$menu = $menu_api->get_menu_location( $request );
		}

		return $menu;
	}
}
new preload_navigation();
