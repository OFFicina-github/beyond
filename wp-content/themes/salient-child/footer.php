<?php
/**
 * The template for displaying the footer.
 *
 * @package Salient WordPress Theme
 * @version 12.2
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
	exit;
}

$nectar_options = get_nectar_theme_options();
$header_format = (!empty($nectar_options['header_format'])) ? $nectar_options['header_format'] : 'default';

nectar_hook_before_footer_open();

?>

<div id="footer-outer" <?php nectar_footer_attributes(); ?>>

	<?php

	// nectar_hook_after_footer_open();
	
	// get_template_part('includes/partials/footer/call-to-action');
	
	// get_template_part('includes/partials/footer/main-widgets');
	
	// get_template_part('includes/partials/footer/copyright-bar');
	
	?>


	<div class="footer-inner">

		<div class="row">

			<div class="col-6">
				<?php
				wp_nav_menu(array(
					'theme_location' => 'footer_menu',
					'container' => 'nav',
					'container_class' => 'footer-nav',
					'menu_class' => 'footer-menu',
					'depth' => 1
				));
				?>
			</div>
			<div class="col-3">
				<?php
				wp_nav_menu(array(
					'theme_location' => 'footer_social_menu',
					'container' => 'nav',
					'container_class' => 'footer-social-nav',
					'menu_class' => 'footer-menu',
					'depth' => 1
				));
				?>
			</div>
			<div class="col-3 footer-info">
				<strong>VICENZA</strong><br>
				Contra Santa Barbara, 33<br>
				36100 - Vicenza<br>
				<a href="mailto:media@beyondpress.it" > media@beyondpress.it</a>
			</div>
		</div>

		<div>
			<div class="col-12">
				<div class="row-info">
					<div>
						© 2025 BEYOND SRL - P.I. 04552790240 - CAPITALE SOCIALE € 10.o00 I.V.
					</div>


					<div>
						<a href="/privacy-policy">
							Privacy Policy
						</a>
						<a href="/cookie-policy">
							Cookie Policy
						</a>
					</div>
				</div>
			</div>
		</div>

	</div>

</div><!--/footer-outer-->

<?php

nectar_hook_before_outer_wrap_close();

get_template_part('includes/partials/footer/off-canvas-navigation');

?>

</div> <!--/ajax-content-wrap-->

<?php

// Boxed theme option closing div.
if (
	!empty($nectar_options['boxed_layout']) &&
	'1' === $nectar_options['boxed_layout'] &&
	'left-header' !== $header_format
) {

	echo '</div><!--/boxed closing div-->';
}

get_template_part('includes/partials/footer/back-to-top');

nectar_hook_after_wp_footer();
nectar_hook_before_body_close();

wp_footer();
?>
</body>

</html>