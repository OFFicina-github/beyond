<?php
/**
 * Shortcode [moderatori_evento]
 *
 * Ripetitore ACF "moderatori" — sotto-campo: link_alla_pagina (Relazione).
 * Da ogni pagina collegata legge i campi ACF: nome_moderatore, immagine.
 */

add_shortcode('moderatori_evento', function () {
    $rows = get_field('moderatori');
    if (!$rows) return '';

    ob_start();
    ?>
    <div>
        <p class="speaker-title h2">
            Moderano l'evento:
        </p>
    </div>
    <div class="sc evento__moderatori custom-carosel">
        <?php foreach ($rows as $row) :
            $posts_collegati = $row['link_alla_pagina'] ?? [];
            if (empty($posts_collegati)) continue;

            foreach ($posts_collegati as $post_obj) :
                $mod_id   = $post_obj->ID;
                $mod_nome = get_field('nome_moderatore', $mod_id);
                $mod_img  = _bp_resolve_img(get_field('immagine', $mod_id), $mod_nome ?: '');
                $mod_url  = get_permalink($mod_id);

                // Separa nome e cognome al primo spazio
                $parts     = $mod_nome ? explode(' ', trim($mod_nome), 2) : ['', ''];
                $firstname = $parts[0];
                $lastname  = $parts[1] ?? '';
        ?>
                <div class="carosel-item">

                    <?php if ($mod_img) : ?>
                        <div class="moderatore__immagine">
                            <img src="<?php echo esc_url($mod_img['url']); ?>"
                                 alt="<?php echo esc_attr($mod_img['alt']); ?>">
                        </div>
                    <?php endif; ?>

                    <div class="carosel-content">
                        <?php if ($mod_nome) : ?>
                            <h2 class="name">
                                <?php echo esc_html($firstname); ?>
                                <?php if ($lastname) : ?><br><em><?php echo esc_html($lastname); ?></em><?php endif; ?>
                            </h2>
                        <?php endif; ?>

                        <a class="nectar-button small regular accent-color regular-button"
                           href="<?php echo esc_url($mod_url); ?>">
                            <span>Vai al profilo</span>
                        </a>
                    </div>

                </div>
            <?php endforeach; ?>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
});
