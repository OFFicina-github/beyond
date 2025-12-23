<!doctype html>
<html <?php language_attributes(); ?> class="no-js">

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<link rel="stylesheet" href="https://use.typekit.net/ulf6rnd.css">
	<script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.25/build/spline-viewer.js"></script>

	<script>
		(function () {
			const KEY = 'intro_seen';
			const TTL = 60 * 60 * 1000;

			try {
				const raw = localStorage.getItem(KEY);
				if (!raw) return;

				const data = JSON.parse(raw);
				if (Date.now() - data.time > TTL) {
					localStorage.removeItem(KEY);
					return;
				}

				const style = document.createElement('style');
				style.innerHTML = `
					#intro-overlay { display: none !important; }
					#header-outer { opacity: 1 !important; }
				`;
				document.head.appendChild(style);

				// ✅ BODY, NON HTML
				document.addEventListener('DOMContentLoaded', () => {
					document.body.classList.add('intro-finished');
				});

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

	if (!empty($nectar_options['favicon']['url'])) {
		echo '<link rel="shortcut icon" href="' . esc_url(nectar_options_img($nectar_options['favicon'])) . '">';
	}

	wp_head();
	?>
</head>

<?php $nectar_header_options = nectar_get_header_variables(); ?>

<body <?php body_class(); ?> <?php nectar_body_attributes(); ?>>

	<?php
	nectar_hook_after_body_open();
	nectar_hook_before_header_nav();

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
	if (!empty($nectar_options['enable-cart']) && $nectar_options['enable-cart'] === '1') {
		get_template_part('includes/partials/header/woo-slide-in-cart');
	}

	if (
		'ascend' === $nectar_header_options['theme_skin'] ||
		(
			'left-header' === $nectar_header_options['header_format'] &&
			'false' !== $nectar_header_options['header_search']
		)
	) {
		get_template_part('includes/header-search');
	}

	get_template_part('includes/partials/footer/body-border');
	?>

	<div id="ajax-content-wrap">
		<?php nectar_hook_after_outer_wrap_open(); ?>