<?php

add_action('wp_enqueue_scripts', 'salient_child_enqueue_styles', 100);

function salient_child_enqueue_styles()
{

    $nectar_theme_version = nectar_get_theme_version();
    wp_enqueue_style('salient-child-font-style', get_stylesheet_directory_uri() . '/assets/css/typography.css', '', $nectar_theme_version);
    wp_enqueue_style('salient-child-style', get_stylesheet_directory_uri() . '/assets/css/style.css', '', $nectar_theme_version);
    wp_enqueue_style('salient-global-style', get_stylesheet_directory_uri() . '/assets/css/global.css', '', $nectar_theme_version);
    wp_enqueue_style('salient-header-style', get_stylesheet_directory_uri() . '/assets/css/header.css', '', $nectar_theme_version);

    if (is_rtl()) {
        wp_enqueue_style('salient-rtl', get_template_directory_uri() . '/rtl.css', array(), '1', 'screen');
    }

    wp_enqueue_script(
        'child-custom-script',
        get_stylesheet_directory_uri() . '/assets/js/script.js',
        array('jquery'),
        null,
        true
    );
}


?>

<?php
// Abilitare il caricamento degli SVG su WordPress
function abilita_caricamento_svg($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'abilita_caricamento_svg');

// Pulizia e sicurezza degli SVG caricati
function pulisci_svg($data, $file, $filename, $mimes, $real_mime)
{
    if (strpos($filename, '.svg') !== false && function_exists('simplexml_load_file')) {
        $xml = simplexml_load_file($file);
        if (!$xml) {
            // Blocca SVG malformati per evitare vulnerabilità
            wp_die(__('Il file SVG contiene codice non valido o pericoloso.'));
        }
    }
    return $data;
}
add_filter('wp_check_filetype_and_ext', 'pulisci_svg', 10, 5);

function add_excerpt_to_pages()
{
    add_post_type_support('page', 'excerpt');
}
add_action('init', 'add_excerpt_to_pages');

function enqueue_spline_viewer()
{
    wp_enqueue_script(
        'spline-viewer',
        'https://unpkg.com/@splinetool/viewer@1.12.6/build/spline-viewer.js',
        array(),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_spline_viewer');

function add_module_attribute_to_spline($tag, $handle)
{
    if ($handle === 'spline-viewer') {
        return str_replace('<script ', '<script type="module" ', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', 'add_module_attribute_to_spline', 10, 2);

function add_gsap_scripts()
{
    wp_enqueue_script(
        'gsap',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
        array(),
        null,
        true
    );

    wp_enqueue_script(
        'gsap-scrolltrigger',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
        array('gsap'),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'add_gsap_scripts');