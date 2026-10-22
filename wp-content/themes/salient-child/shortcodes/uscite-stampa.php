<?php

/**
 * Shortcode [uscite_stampa]
 *
 * Ripetitore ACF "uscite_stampa" — sotto-campi: immagine (url), titolo, data_uscita, link_uscita (link).
 * Layout: indice sticky a sinistra (1/4) + feed di card a destra (3/4).
 */

add_shortcode('uscite_stampa', function () {
    $rows = get_field('uscite_stampa');
    if (!$rows) return '';

    // Prefisso univoco nel caso lo shortcode sia usato più volte nella pagina
    static $instance = 0;
    $instance++;
    $prefix = 'uscita-' . $instance . '-';

    ob_start();
?>
    <section class="uscite-stampa" data-uscite-stampa>

        <!-- ── INDICE ─────────────────────────────────────── -->
        <aside class="uscite-stampa__index">
            <button type="button" class="uscite-stampa__toggle" aria-expanded="false">
                <span>Indice</span>
                <span class="uscite-stampa__count"><?php echo count($rows); ?></span>
            </button>

            <nav class="uscite-stampa__nav" aria-label="Indice uscite stampa" data-lenis-prevent>
                <ol class="uscite-stampa__list">
                    <?php foreach ($rows as $i => $row) :
                        $titolo = $row['titolo'] ?? '';
                        if (!$titolo) continue;
                    ?>
                        <li>
                            <a href="#<?php echo esc_attr($prefix . $i); ?>" class="uscite-stampa__nav-link" data-target="<?php echo esc_attr($prefix . $i); ?>">
                                <?php echo esc_html($titolo); ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ol>
            </nav>
        </aside>

        <!-- ── FEED ───────────────────────────────────────── -->
        <div class="uscite-stampa__feed">
            <?php foreach ($rows as $i => $row) :
                $immagine = $row['immagine'] ?? '';
                $titolo   = $row['titolo'] ?? '';
                $data     = $row['data_uscita'] ?? '';
                $link     = $row['link_uscita'] ?? '';
                $desc     = $row['descrizione'] ?? '';

                // Il campo link può restituire un array (url/title/target) o solo l'url
                if (is_array($link)) {
                    $link_url    = $link['url'] ?? '';
                    $link_target = $link['target'] ?: '_self';
                } else {
                    $link_url    = $link;
                    $link_target = '_blank';
                }

                $tag = $link_url ? 'a' : 'div';

                // Tipo uscita (radio): gestisce return format valore, etichetta o array
                $tipo = $row['tipo_uscita'] ?? '';
                if (is_array($tipo)) {
                    $tipo = $tipo['value'] ?? '';
                }
                $tipi = [
                    'servizio_tv' => ['label' => 'Servizio TV', 'cta' => 'Guarda il servizio'],
                    'articolo'    => ['label' => 'Articolo', 'cta' => "Leggi l'articolo"],
                ];
                if (!isset($tipi[$tipo])) {
                    // Return format "etichetta": risalgo al valore
                    $tipo = array_search($tipo, array_combine(array_keys($tipi), array_column($tipi, 'label'))) ?: '';
                }
                $tipo_label = $tipo ? $tipi[$tipo]['label'] : '';
                $cta        = $tipo ? $tipi[$tipo]['cta'] : "Leggi l'articolo";

                // Se la card è già un link, rimuovo i link dal WYSIWYG (niente <a> annidati)
                $desc_allowed = wp_kses_allowed_html('post');
                if ($link_url) {
                    unset($desc_allowed['a']);
                }
            ?>
                <<?php echo $tag; ?> id="<?php echo esc_attr($prefix . $i); ?>" class="uscita-card"
                    <?php if ($link_url) : ?>
                    href="<?php echo esc_url($link_url); ?>"
                    target="<?php echo esc_attr($link_target); ?>"
                    <?php echo $link_target === '_blank' ? 'rel="noopener noreferrer"' : ''; ?>
                    <?php endif; ?>>

                    <div class="uscita-card__media">
                        <?php if ($tipo_label) : ?>
                            <span class="uscita-card__tipo uscita-card__tipo--<?php echo esc_attr($tipo); ?>"><?php echo esc_html($tipo_label); ?></span>
                        <?php endif; ?>
                        <?php if ($immagine) : ?>
                            <img src="<?php echo esc_url($immagine); ?>" alt="<?php echo esc_attr($titolo); ?>" loading="lazy">
                        <?php else : ?>
                            <img src="https://beyondpress.it/wp-content/uploads/2026/10/Screenshot-2026-10-22-alle-16.16.08.jpg" alt="<?php echo esc_attr($titolo); ?>" loading="lazy">
                        <?php endif; ?>
                    </div>

                    <div class="uscita-card__info">
                        <?php if ($data) : ?>
                            <p class="uscita-card__data"><?php echo esc_html($data); ?></p>
                        <?php endif; ?>

                        <?php if ($titolo) : ?>
                            <h3 class="uscita-card__titolo h4"><?php echo esc_html($titolo); ?></h3>
                        <?php endif; ?>

                        <?php if ($desc) : ?>
                            <div class="uscita-card__descrizione">
                                <?php echo wp_kses($desc, $desc_allowed); ?>
                            </div>
                        <?php endif; ?>

                        <?php if ($link_url) : ?>
                            <span class="uscita-card__cta"><?php echo esc_html($cta); ?></span>
                        <?php endif; ?>
                    </div>

                </<?php echo $tag; ?>>
            <?php endforeach; ?>
        </div>

    </section>
<?php
    return ob_get_clean();
});
