<?php
/**
 * Shortcode [discutono_evento]
 *
 * Ripetitore ACF "discutono" — sotto-campi: foto (immagine), nome, titolo.
 * Stesso markup dei moderatori, senza bottone.
 */

add_shortcode('discutono_evento', function () {
    $rows = get_field('discutono');
    if (!$rows) return '';

    ob_start();
    ?>
    <div>
        <p class="speaker-title h2">
            Discutono:
        </p>
    </div>
    <div class="sc evento__discutono custom-carosel">
        <?php foreach ($rows as $persona) :
            $img  = _bp_resolve_img($persona['foto'] ?? null, $persona['nome'] ?? '');
            $nome = $persona['nome'] ?? '';

            // Separa nome e cognome al primo spazio
            $parts     = $nome ? explode(' ', trim($nome), 2) : ['', ''];
            $firstname = $parts[0];
            $lastname  = $parts[1] ?? '';
        ?>
            <div class="carosel-item">

                <?php if ($img) : ?>
                    <div class="discutono__immagine">
                        <img src="<?php echo esc_url($img['url']); ?>"
                             alt="<?php echo esc_attr($img['alt']); ?>">
                    </div>
                <?php endif; ?>

                <div class="carosel-content">
                    <?php if ($nome) : ?>
                        <h2 class="name">
                            <?php echo esc_html($firstname); ?>
                            <?php if ($lastname) : ?><br><em><?php echo esc_html($lastname); ?></em><?php endif; ?>
                        </h2>
                    <?php endif; ?>

                    <?php if (!empty($persona['titolo'])) : ?>
                        <span class="discutono__titolo"><?php echo esc_html($persona['titolo']); ?></span>
                    <?php endif; ?>
                </div>

            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
});
