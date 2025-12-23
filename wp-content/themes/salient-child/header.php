<!doctype html>
<html <?php language_attributes(); ?> class="no-js">

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<link rel="stylesheet" href="https://use.typekit.net/ulf6rnd.css">
	<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1/bundled/lenis.min.js"></script>
	<script src="https://unpkg.com/gsap/dist/gsap.min.js"></script>
	<script src="https://unpkg.com/gsap/dist/ScrollTrigger.min.js"></script>
	<script src="https://unpkg.com/split-type"></script>
	<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
	<link href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" rel="stylesheet">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>
	<script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.25/build/spline-viewer.js"></script>

	<script>
		// Questa cosa serve per settare un cookie per l'intro, una volta che l'hai vista per un'ore non la vedi 
		(function () {
			const KEY = 'intro_seen';
			const TTL = 1 * 60 * 60 * 1000; // 1 ore

			try {
				const raw = localStorage.getItem(KEY);
				if (!raw) return;

				const data = JSON.parse(raw);
				if (Date.now() - data.time > TTL) {
					localStorage.removeItem(KEY);
					return;
				}

				// 👉 INTRO GIÀ VISTA → BLOCCA SUBITO
				const style = document.createElement('style');
				style.innerHTML = `
					#intro-overlay { display: none !important; }
					#header-outer { opacity: 1 !important; }
				`;
				document.head.appendChild(style);

				// flag utile per JS
				window.__INTRO_SKIPPED__ = true;

			} catch (e) {
				localStorage.removeItem(KEY);
			}
		})();
	</script>


	<script type="importmap">
	  {
		"imports": {
		  "@splinetool/runtime": "https://unpkg.com/@splinetool/runtime@1.12.21/build/runtime.js"
		}
	  }
	</script>
	<?php
	$nectar_options = get_nectar_theme_options();

	nectar_meta_viewport();

	// Shortcut icon fallback.
	if (!empty($nectar_options['favicon']) && !empty($nectar_options['favicon']['url'])) {
		echo '
	<link rel="shortcut icon" href="' . esc_url(nectar_options_img($nectar_options['favicon'])) . '" />';
	}

	wp_head();

	?>
</head>
<?php

$nectar_header_options = nectar_get_header_variables();

?>

<body <?php body_class(); ?> <?php nectar_body_attributes(); ?>>

	<?php

	nectar_hook_after_body_open();

	nectar_hook_before_header_nav();

	// Boxed theme option opening div.
	if ($nectar_header_options['n_boxed_style']) {
		echo '<div id="boxed">';
	}

	get_template_part('includes/partials/header/header-space');

	?>
	<div id="header-outer" <?php nectar_header_nav_attributes(); ?>>
		<?php

		get_template_part('includes/partials/header/secondary-navigation');

		if (
			'ascend' !== $nectar_header_options['theme_skin'] &&
			'left-header' !== $nectar_header_options['header_format']
		) {
			get_template_part('includes/header-search');
		}

		get_template_part('includes/partials/header/header-menu');


		?>

	</div>
	<?php

	if (!empty($nectar_options['enable-cart']) && '1' === $nectar_options['enable-cart']) {
		get_template_part('includes/partials/header/woo-slide-in-cart');
	}

	if (
		'ascend' === $nectar_header_options['theme_skin'] ||
		'left-header' === $nectar_header_options['header_format'] &&
		'false' !== $nectar_header_options['header_search']
	) {
		get_template_part('includes/header-search');
	}

	get_template_part('includes/partials/footer/body-border');

	?>
	<div id="ajax-content-wrap">
		<?php

		nectar_hook_after_outer_wrap_open();
