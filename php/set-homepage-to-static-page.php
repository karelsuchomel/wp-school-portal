<?php

 $my_post = array(
          'post_title'    => 'hello',
          'post_content'  => 'This is my post.',
          'post_status'   => 'publish',
          'post_author'   => 1,
          'post_category' => array(1),
          'post_type'     => 'page'
          );

          // Insert the post into the database
          wp_insert_post( $my_post );
          
          
          
          
          
          
<?php
/**
 * Create/import a page with prefilled blocks and set this page as homepage 
 */

/**
 * Class wrapper for homepage actions
 */
class SchoolPortal_SetHomepage {
	/**
	 * Set up actions
	 */
	public function __construct() {
		add_action( 'admin_notices', array( $this, 'admin_permalinks_warning' ) );
		add_action( 'init', array( $this, 'change_date' ) );
		add_action( 'init', array( $this, 'change_paged' ) );
		add_action( 'init', array( $this, 'change_page' ) );
		add_action( 'init', array( $this, 'add_new_attachment' ) );
		add_action( 'after_switch_theme', array( $this, 'update_permalinks' ), 11 );
		add_action( 'template_redirect', array( $this, 'do_redirects' ) );
		add_action( 'admin_head-options-permalink.php', array( $this, 'add_contextual_permalink_help' ) );

		// Flush permalinks after the theme is activated.
		add_action( 'after_switch_theme', 'flush_rewrite_rules' );
	}

	/**
	 * Add a warning message to the theme screen after activation.
	 */
	public function admin_theme_warning() {
		?>
		<div class="notice notice-warning">
			<p><?php _e( 'We have automatically created a static page with a few blocks and set it as homepage.', 'school_portal' ); ?></p>
		</div>
		<?php
	}

	public function update_permalinks() {
    		global $wp_rewrite;
    		$wp_rewrite->set_permalink_structure( '/%year%/%monthnum%/%postname%/' );
    		add_action( 'admin_notices', array( $this, 'admin_theme_warning' ) );
    	}

	/**
	 * Redirect the search form results `?s=<term>` to `/search/<term>`
	 */
	public function do_redirects() {
		$search = get_search_query();
		global $wp;
		if ( $search && ( 'search' !== substr( $wp->request, 0, 6 ) ) ) {
			// Decode the quotes before re-encoding in the redirect
			$search = html_entity_decode( $search, ENT_QUOTES );
			$url = home_url( sprintf( '/search/%s', urlencode( $search ) ) );
			wp_safe_redirect( $url );
			exit();
		} elseif ( is_attachment() ) {
			$attachment = get_queried_object_id();
			wp_safe_redirect( home_url( sprintf( '/attachment/%s', $attachment ) ) );
			exit();
		}
	}
}
new SchoolPortal_SetHomepage();
