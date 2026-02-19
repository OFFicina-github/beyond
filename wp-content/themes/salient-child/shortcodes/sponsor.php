<?php
/**
 * Shortcode [sponsor_evento]
 *
 * Ripetitore ACF "sponsor" — sotto-campi: logo (immagine), url.
 */

add_shortcode('sponsor_evento', function () {
    $rows = get_field('sponsor');
    if (!$rows) return '';

    ob_start();
    ?>
    <div>
        <p class="speaker-title h2 text-center">
            Sponsor:
        </p>
    </div>
    <div class="clients-section">
        <div class="carousel-outer">
            <div class="sc evento__sponsor-slider splide" aria-label="Sponsor">
                <div class="splide__track">
                    <ul class="splide__list">
                        <?php foreach ($rows as $s) :
                            $logo = _bp_resolve_img($s['logo'] ?? null, 'Sponsor');
                            $url  = $s['url'] ?? '';
                        ?>
                            <li class="splide__slide sponsor__item">

                                <?php if ($url) : ?>
                                    <a href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener noreferrer">
                                <?php endif; ?>

                                <?php if ($logo) : ?>
                                    <img src="<?php echo esc_url($logo['url']); ?>"
                                         alt="<?php echo esc_attr($logo['alt']); ?>">
                                <?php endif; ?>

                                <?php if ($url) : ?>
                                    </a>
                                <?php endif; ?>

                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
});
