<?php
/*
Engue block editor scripts and styles
*/

function sp_register_blocks() {
    wp_register_script(
        'sp-editor-blocks-js',
        get_template_directory_uri() . '/dist/js/editor-blocks.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n' ),
        true
    );

    wp_register_style(
        'sp-editor-blocks-styles',
        get_template_directory_uri() . '/dist/css/editor-blocks.css',
        array( 'wp-edit-blocks' )
    );
 
    register_block_type( 'school-portal/hero-card', array(
        'editor_script' => 'sp-editor-blocks-js',
        'editor_style' => 'sp-editor-blocks-styles',
    ) );
}
add_action( 'enqueue_block_editor_assets', 'sp_register_blocks' );