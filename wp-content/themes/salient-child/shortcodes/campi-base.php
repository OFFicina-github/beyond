<?php
/**
 * Shortcode per i campi semplici (testo, immagine singola) del CPT evento.
 *
 * [nome_evento]
 * [copertina_evento]
 * [descrizione_evento]
 * [data_evento]
 * [ora_evento]
 * [luogo_evento]
 * [indirizzo_evento]
 * [allegato_evento]
 * [presentatore_evento]
 */

add_shortcode('nome_evento', function () {
    $v = get_field('nome_evento');
    return $v ? '<span class="sc sc-nome-evento">' . esc_html($v) . '</span>' : '';
});

add_shortcode('copertina_evento', function () {
    $img = _bp_resolve_img(get_field('copertina_evento'), get_field('nome_evento') ?: '');
    if (!$img) return '';
    return '<div class="evento__copertina"><img src="' . esc_url($img['url']) . '" alt="' . esc_attr($img['alt']) . '"></div>';
});

add_shortcode('descrizione_evento', function () {
    $v = get_field('descrizione_evento');
    return $v ? '<div class="sc sc-descrizione-evento"><p>' . wp_kses_post($v) . '</p></div>' : '';
});

add_shortcode('data_evento', function () {
    $v = get_field('data_evento');
    return $v ? '<span class="sc sc-data-evento">' . esc_html(str_replace('/', '.', $v)) . '</span>' : '';
});

add_shortcode('ora_evento', function () {
    $v = get_field('ora_evento');
    return $v ? '<span class="sc sc-ora-evento">' . esc_html($v) . '</span>' : '';
});

add_shortcode('luogo_evento', function () {
    $v = get_field('luogo_evento');
    return $v ? '<span class="sc sc-luogo-evento">' . esc_html($v) . '</span>' : '';
});

add_shortcode('indirizzo_evento', function () {
    $v = get_field('indirizzo_evento');
    return $v ? '<span class="sc sc-indirizzo-evento">' . esc_html($v) . '</span>' : '';
});

add_shortcode('allegato_evento', function () {
    $v = get_field('allegato');
    return $v ? '<a class="sc sc-allegato-evento" target="_blank" href="' . esc_url($v) . '" target="_blank" rel="noopener noreferrer">Scarica la locandina</a>' : '';
});

add_shortcode('presentatore_evento', function () {
    $nome  = get_field('presentatore');
    $foto  = _bp_resolve_img(get_field('foto_presentatore'), $nome ?: '');
    $ruolo = get_field('ruolo_presentatore');

    if (!$nome && !$foto) return '';

    $parts     = $nome ? explode(' ', trim($nome), 2) : ['', ''];
    $firstname = $parts[0];
    $lastname  = $parts[1] ?? '';

    ob_start();
    ?>
    <div>
        <p class="speaker-title h2">
            Presenta l'evento:
        </p>
    </div>
    <div class="sc evento__presentatore">
        <div class="carosel-item">

            <?php if ($foto) : ?>
                <div class="presentatore__immagine">
                    <img src="<?php echo esc_url($foto['url']); ?>"
                         alt="<?php echo esc_attr($foto['alt']); ?>">
                </div>
            <?php endif; ?>

            <div class="carosel-content">
                <?php if ($nome) : ?>
                    <h2 class="name">
                        <?php echo esc_html($firstname); ?>
                        <?php if ($lastname) : ?><br><em><?php echo esc_html($lastname); ?></em><?php endif; ?>
                    </h2>
                <?php endif; ?>

                <?php if ($ruolo) : ?>
                    <p class="ruolo"><?php echo esc_html($ruolo); ?></p>
                <?php endif; ?>
            </div>

        </div>
    </div>
    <?php
    return ob_get_clean();
});
