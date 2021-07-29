<?php
/**
 * Pre-load the navigation menu as a JSON object
 */

/**
 * Class wrapper for menu loading
 */
class SP_LoadNavigation {
	/**
	 * Set up actions
	 */
	public function __construct() {
		add_filter( 'wp_enqueue_scripts', array( $this, 'print_data' ) );
	}

	/**
	 * Adds the json-string data to the react app script
	 */
	public function print_data() {
		$menu_data = sprintf(
			'window.navigationData = { primary: %s, userMenu: %s, dashboard: %s };',
			$this->add_json_data("primary"),
			$this->add_json_data("user-centric"),
			$this->add_json_data("front-page-sidebar"),
		);
		wp_add_inline_script( 'sp-react', $menu_data, 'before' );
	}

	/**
	 * Dumps the current query response as a JSON-encoded string
	 */
	public function add_json_data($navigationId) {
	    if(class_exists( 'WP_REST_Menus' )) {
            return wp_json_encode( $this->get_menu_data($navigationId) );
	    } else {
	        return wp_json_encode( array("REST Menu plugin is not installed or disabled") );
	    }
	}

	/**
	 * Gets menu data from the JSON API server
	 *
	 * @return array
	 */
	public function get_menu_data($navigationId) {
		$menu = array();

		$request = new \WP_REST_Request();
		$request['context'] = 'view';
		$request['location'] = $navigationId;

		if ( class_exists( 'WP_REST_Menus' ) ) {
			$menu_api = new WP_REST_Menus();
			$menu = $menu_api->get_menu_location( $request );
		}

		return $menu;
	}
}
new SP_LoadNavigation();
