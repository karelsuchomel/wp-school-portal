<?php
function sp_preload_wp_settings() {

    $url = trailingslashit( home_url() );
	$path = trailingslashit( wp_parse_url( $url )['path'] );

	$front_page_slug = false;
	$blog_page_slug = false;
	if ( 'posts' !== get_option( 'show_on_front' ) ) {
		$front_page_id = get_option( 'page_on_front' );
		$front_page = get_post( $front_page_id );
		if ( $front_page->post_name ) {
			$front_page_slug = $front_page->post_name;
		}

		$blog_page_id = get_option( 'page_for_posts' );
		$blog_page = get_post( $blog_page_id );
		if ( $blog_page->post_name ) {
			$blog_page_slug = $blog_page->post_name;
		}
	}

	$user_id = get_current_user_id();

	$wp_settings = sprintf(
		'window.SiteSettings = %s;',
		wp_json_encode( array(
			'endpoint' => $url,
			'nonce' => wp_create_nonce( 'wp_rest' ),
			'user' => $user_id,
            			'userDisplay' => $user_id ? get_the_author_meta( 'display_name', $user_id ) : '',
            			'frontPage' => array(
            				'page' => $front_page_slug,
            				'blog' => $blog_page_slug,
            			),
            			'URL' => array(
            				'base' => esc_url_raw( $url ),
            				'path' => $path,
            			),
            			'meta' => array(
            				'title' => get_bloginfo( 'name', 'display' ),
            				'description' => get_bloginfo( 'description', 'display' ),
            			),
		) ),
	);
	wp_add_inline_script( 'sp-react', $wp_settings, 'before' );
}
add_action( 'wp_enqueue_scripts', 'sp_preload_wp_settings' );