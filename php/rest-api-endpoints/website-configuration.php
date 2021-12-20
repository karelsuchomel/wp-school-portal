<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'configuration/v1', '/settings)', array(
    'methods' => 'GET',
    'callback' => 'my_awesome_func',
  ) );

  register_rest_route( 'configuration/v1', '/navigation)', array(
      'methods' => 'GET',
      'callback' => 'my_awesome_func',
    ) );
} );