<?php

/**
 * Single template for the "evento" post type.
 *
 * @package Salient Child Theme
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

while (have_posts()):
    the_post();

    $cov_raw = get_field('copertina_evento');
    $nome_evento = get_field('nome_evento');
    $presentatore = get_field('presentatore');
    $data_evento = get_field('data_evento');
    $ora_evento = get_field('ora_evento');
    $luogo_evento = get_field('luogo_evento');
    $indirizzo_evento = get_field('indirizzo_evento');

    if (is_array($cov_raw) && !empty($cov_raw['url'])) {
        $cov_url = $cov_raw['url'];
        $cov_alt = $cov_raw['alt'] ?: $nome_evento;
    } elseif (!empty($cov_raw)) {
        $cov_url = $cov_raw;
        $cov_alt = $nome_evento;
    } else {
        $cov_url = '';
        $cov_alt = '';
    }
    ?>

    <article id="evento-<?php the_ID(); ?>" class="single-evento">

        <!-- ── HERO ──────────────────────────────────────────── -->
        <section class="evento__hero">

            <?php if ($cov_url): ?>
                <div class="evento__hero-bg">
                    <img src="<?php echo esc_url($cov_url); ?>" alt="<?php echo esc_attr($cov_alt); ?>">
                </div>
            <?php endif; ?>

            <div class="evento__hero-info">

                <div class="box-1">
                    <?php if ($nome_evento): ?>
                        <?php if ($presentatore): ?>
                            <p class="h4 presentatore">
                                <?php echo esc_html($presentatore); ?> presenta
                            </p>
                        <?php endif; ?>

                        <h1 class="evento__titolo  h1">
                            <?php the_title(); ?>
                        </h1>
                    <?php endif; ?>
                </div>

                <div class="evento__meta">
                    <?php if ($data_evento): ?>
                        <div class="yellow">
                            <p class="info-title">Data</p>
                            <span class="h4 evento__data"><?php echo esc_html(str_replace('/', '.', $data_evento)); ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if ($ora_evento): ?>
                        <div class="yellow">
                            <p class="info-title">Ora</p>
                            <span class="h4 evento__ora"><?php echo esc_html($ora_evento); ?></span>
                        </div>
                    <?php endif; ?>

                    <div class="yellow">
                        <p class="info-title">Luogo</p>
                        <?php if ($luogo_evento): ?>
                            <span class="h4 evento__luogo"><?php echo esc_html($luogo_evento); ?></span>
                        <?php endif; ?>
                        <br>
                        <?php if ($indirizzo_evento): ?>
                            <span class="evento__indirizzo"><?php echo esc_html($indirizzo_evento); ?></span>
                        <?php endif; ?>
                    </div>
                </div>

            </div>

        </section>
        <!-- ── FINE HERO ─────────────────────────────────────── -->

        <!-- ── CONTENUTO ────────────────────────────────────────── -->
        <div class="container-wrap">
            <div class="container main-content">
                <?php
                // echo do_shortcode('[allegato_evento]');
                // echo do_shortcode('[descrizione_evento]');
                // echo do_shortcode('[presentatore_evento]');
                // echo do_shortcode('[discutono_evento]');
                // echo do_shortcode('[moderatori_evento]');
                // echo do_shortcode('[sponsor_evento]');
                the_content();
                ?>
            </div>
        </div>

    </article>

    <?php
endwhile;

get_footer();
?>