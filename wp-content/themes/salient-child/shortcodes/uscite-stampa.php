<?php

/**
 * Shortcode [uscite_stampa]
 *
 * Ripetitore ACF "uscite_stampa" — sotto-campi: immagine (url), titolo, data_uscita, link_uscita (link),
 * descrizione (wysiwyg), tipo_uscita (radio: servizio_tv / articolo).
 * Layout: indice sticky a sinistra (1/4) + feed di card a destra (3/4).
 * Indice e feed divisi in due gruppi: prima TV, poi Stampa (articoli e uscite senza tipo).
 */

add_shortcode('uscite_stampa', function () {
    $rows = get_field('uscite_stampa');
    if (!$rows) return '';

    // Prefisso univoco nel caso lo shortcode sia usato più volte nella pagina
    static $instance = 0;
    $instance++;
    $prefix = 'uscita-' . $instance . '-';

    // label = etichetta mostrata in card, acf = etichetta della scelta in ACF
    $tipi = [
        'servizio_tv' => ['label' => 'TV', 'acf' => 'Servizio TV', 'cta' => 'Guarda il servizio'],
        'articolo'    => ['label' => 'STAMPA', 'acf' => 'Articolo', 'cta' => "Leggi l'articolo"],
    ];

    $gruppi = [
        'tv'     => ['titolo' => 'TV', 'items' => []],
        'stampa' => ['titolo' => 'Stampa', 'items' => []],
    ];

    // ── Normalizzo i dati e li divido nei gruppi (mantenendo l'ordine del backend) ──
    foreach ($rows as $i => $row) {
        $link = $row['link_uscita'] ?? '';

        // Il campo link può restituire un array (url/title/target) o solo l'url
        if (is_array($link)) {
            $link_url    = $link['url'] ?? '';
            $link_target = $link['target'] ?: '_self';
        } else {
            $link_url    = $link;
            $link_target = '_blank';
        }

        // Tipo uscita (radio): gestisce return format valore, etichetta o array
        $tipo = $row['tipo_uscita'] ?? '';
        if (is_array($tipo)) {
            $tipo = $tipo['value'] ?? '';
        }
        if (!isset($tipi[$tipo])) {
            $tipo = array_search($tipo, array_combine(array_keys($tipi), array_column($tipi, 'acf'))) ?: '';
        }

        $item = [
            'id'          => $prefix . $i,
            'immagine'    => $row['immagine'] ?? '',
            'titolo'      => $row['titolo'] ?? '',
            'data'        => $row['data_uscita'] ?? '',
            'desc'        => $row['descrizione'] ?? '',
            'link_url'    => $link_url,
            'link_target' => $link_target,
            'tipo'        => $tipo,
            'tipo_label'  => $tipo ? $tipi[$tipo]['label'] : '',
            'cta'         => $tipo ? $tipi[$tipo]['cta'] : "Leggi l'articolo",
        ];

        $gruppi[$tipo === 'servizio_tv' ? 'tv' : 'stampa']['items'][] = $item;
    }

    $gruppi = array_filter($gruppi, function ($g) {
        return !empty($g['items']);
    });

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
                <?php foreach ($gruppi as $key => $gruppo) : ?>
                    <div class="uscite-stampa__group uscite-stampa__group--<?php echo esc_attr($key); ?>">
                        <p class="uscite-stampa__group-title">
                            <?php echo esc_html($gruppo['titolo']); ?>
                            <span><?php echo count($gruppo['items']); ?></span>
                        </p>
                        <ol class="uscite-stampa__list">
                            <?php foreach ($gruppo['items'] as $item) :
                                if (!$item['titolo']) continue;
                            ?>
                                <li>
                                    <a href="#<?php echo esc_attr($item['id']); ?>" class="uscite-stampa__nav-link" data-target="<?php echo esc_attr($item['id']); ?>">
                                        <?php echo esc_html($item['titolo']); ?>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ol>
                    </div>
                <?php endforeach; ?>
            </nav>
        </aside>

        <!-- ── FEED ───────────────────────────────────────── -->
        <div class="uscite-stampa__feed">
            <?php foreach ($gruppi as $key => $gruppo) : ?>

                <div class="uscite-stampa__feed-divider uscite-stampa__feed-divider--<?php echo esc_attr($key); ?>">
                    <span><?php echo esc_html($gruppo['titolo']); ?></span>
                </div>

                <?php foreach ($gruppo['items'] as $item) :
                    $tag = $item['link_url'] ? 'a' : 'div';

                    // Se la card è già un link, rimuovo i link dal WYSIWYG (niente <a> annidati)
                    $desc_allowed = wp_kses_allowed_html('post');
                    if ($item['link_url']) {
                        unset($desc_allowed['a']);
                    }
                ?>
                    <<?php echo $tag; ?> id="<?php echo esc_attr($item['id']); ?>" class="uscita-card"
                        <?php if ($item['link_url']) : ?>
                        href="<?php echo esc_url($item['link_url']); ?>"
                        target="<?php echo esc_attr($item['link_target']); ?>"
                        <?php echo $item['link_target'] === '_blank' ? 'rel="noopener noreferrer"' : ''; ?>
                        <?php endif; ?>>

                        <div class="uscita-card__media">
                            <?php if ($item['tipo_label']) : ?>
                                <span class="uscita-card__tipo uscita-card__tipo--<?php echo esc_attr($item['tipo']); ?>"><?php echo esc_html($item['tipo_label']); ?></span>
                            <?php endif; ?>
                            <?php if ($item['immagine']) : ?>
                                <img src="<?php echo esc_url($item['immagine']); ?>" alt="<?php echo esc_attr($item['titolo']); ?>" loading="lazy">
                            <?php else : ?>
                                <img src="https://beyondpress.it/wp-content/uploads/2026/10/Screenshot-2026-10-22-alle-16.16.08.jpg" alt="<?php echo esc_attr($item['titolo']); ?>" loading="lazy">
                            <?php endif; ?>
                        </div>

                        <div class="uscita-card__info">
                            <?php if ($item['data']) : ?>
                                <p class="uscita-card__data"><?php echo esc_html($item['data']); ?></p>
                            <?php endif; ?>

                            <?php if ($item['titolo']) : ?>
                                <h3 class="uscita-card__titolo h4"><?php echo esc_html($item['titolo']); ?></h3>
                            <?php endif; ?>

                            <?php if ($item['desc']) : ?>
                                <div class="uscita-card__descrizione">
                                    <?php echo wp_kses($item['desc'], $desc_allowed); ?>
                                </div>
                            <?php endif; ?>

                            <?php if ($item['link_url']) : ?>
                                <span class="uscita-card__cta"><?php echo esc_html($item['cta']); ?></span>
                            <?php else : ?>
                                <span class="uscita-card__cta no_border">ARTICOLO CARTACEO</span>
                            <?php endif; ?>
                        </div>

                    </<?php echo $tag; ?>>
                <?php endforeach; ?>

            <?php endforeach; ?>
        </div>

    </section>
<?php
    return ob_get_clean();
});
