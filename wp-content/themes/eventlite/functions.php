<?php
function eventlite_enqueue_styles() {
    wp_enqueue_style('eventlite-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'eventlite_enqueue_styles');
