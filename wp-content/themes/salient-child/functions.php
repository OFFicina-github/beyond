<?php

/* ---------------------------------------------------------
 * ENQUEUE STYLES & SCRIPTS
 * --------------------------------------------------------- */
add_action('wp_enqueue_scripts', 'off_enqueue_assets', 100);
function off_enqueue_assets()
{

    $version = nectar_get_theme_version();


    /* CSS */
    wp_enqueue_style('off-typography', get_stylesheet_directory_uri() . '/assets/css/typography.css', [], $version);
    // wp_enqueue_style('off-style', get_stylesheet_directory_uri() . '/assets/css/style.css', [], $version);
    wp_enqueue_style('salient-child-style', get_stylesheet_directory_uri() . '/assets/css/style.css', '', $version);
    wp_enqueue_style('off-global', get_stylesheet_directory_uri() . '/assets/css/global.css', [], $version);
    wp_enqueue_style('off-reputation-driven', get_stylesheet_directory_uri() . '/assets/css/reputation-driven.css', [], $version);
    wp_enqueue_style('off-media-relations', get_stylesheet_directory_uri() . '/assets/css/media-relations.css', [], $version);
    wp_enqueue_style('off-header', get_stylesheet_directory_uri() . '/assets/css/header.css', [], $version);
    wp_enqueue_style('off-fla', get_stylesheet_directory_uri() . '/assets/css/fla_style.css', [], $version);
    wp_enqueue_style('off-evento', get_stylesheet_directory_uri() . '/assets/css/evento.css', [], $version);

    wp_enqueue_style(
        'splide',
        'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css',
        [],
        '4.1.4'
    );

    if (is_rtl()) {
        wp_enqueue_style('salient-rtl', get_template_directory_uri() . '/rtl.css', [], $version);
    }

    /* JS LIBRARIES */
    wp_enqueue_script('lenis', 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1/bundled/lenis.min.js', [], null, true);
    wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', [], null, true);
    wp_enqueue_script('gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', ['gsap'], null, true);
    wp_enqueue_script('split-type', 'https://unpkg.com/split-type', [], null, true);
    wp_enqueue_script('splide', 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js', [], null, true);
    wp_enqueue_script('matter', 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js', [], null, true);

    /* CUSTOM JS */
    wp_enqueue_script('off-main', get_stylesheet_directory_uri() . '/assets/js/script.js', ['jquery'], $version, true);
    wp_enqueue_script('off-string', get_stylesheet_directory_uri() . '/assets/js/string.js', ['jquery'], $version, true);

    /* SPLINE MODULE */
    wp_enqueue_script(
        'spline-init',
        get_stylesheet_directory_uri() . '/assets/js/spline-init.js',
        [],
        $version,
        true
    );
}

/* ---------------------------------------------------------
 * SCRIPT MODULE ATTRIBUTES
 * --------------------------------------------------------- */
add_filter('script_loader_tag', function ($tag, $handle, $src) {
    if ($handle === 'spline-init') {
        return '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}, 10, 3);

/* ---------------------------------------------------------
 * SVG SUPPORT
 * --------------------------------------------------------- */
add_filter('upload_mimes', function ($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    $mimes['ico'] = 'image/x-icon';
    return $mimes;
});



add_filter('wp_check_filetype_and_ext', function ($data, $file, $filename) {

    // Validazione SVG (come avevi già)
    if (stripos($filename, '.svg') !== false && function_exists('simplexml_load_file')) {
        if (!simplexml_load_file($file)) {
            wp_die(__('SVG non valido.'));
        }
        // forza type/ext per evitare blocchi
        $data['ext']  = 'svg';
        $data['type'] = 'image/svg+xml';
    }

    // Supporto ICO (forza type/ext per evitare blocchi)
    if (stripos($filename, '.ico') !== false) {
        $data['ext']  = 'ico';
        $data['type'] = 'image/x-icon';
    }

    return $data;
}, 10, 3);

/* ---------------------------------------------------------
 * SHORTCODES
 * --------------------------------------------------------- */
require_once get_stylesheet_directory() . '/shortcodes/helper.php';
require_once get_stylesheet_directory() . '/shortcodes/campi-base.php';
require_once get_stylesheet_directory() . '/shortcodes/discutono.php';
require_once get_stylesheet_directory() . '/shortcodes/moderatori.php';
require_once get_stylesheet_directory() . '/shortcodes/sponsor.php';

/* ---------------------------------------------------------
 * EXTRAS
 * --------------------------------------------------------- */
add_action('init', function () {
    add_post_type_support('page', 'excerpt');
});

add_action('after_setup_theme', function () {
    register_nav_menus([
        'footer_menu' => __('Footer Menu', 'off-theme'),
        'footer_social_menu' => __('Footer Social Menu', 'off-theme'),
    ]);
});
