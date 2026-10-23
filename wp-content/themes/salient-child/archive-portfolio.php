<?php

/**
 * Archive template for the "portfolio" post type.
 * Filtro laterale a 2 livelli (tassonomia "categoria_servizio") gestito in JS.
 *
 * @package Salient Child Theme
 */

if (!defined('ABSPATH')) {
    exit;
}

$taxonomy = 'categoria_servizio';

// Albero categorie: genitori + figli (solo termini con progetti)
$parent_terms = get_terms([
    'taxonomy'   => $taxonomy,
    'parent'     => 0,
    'hide_empty' => false,
    'orderby'    => 'name',
]);
$parent_terms = is_wp_error($parent_terms) ? [] : $parent_terms;

get_header();
?>

<div class="container-wrap">
    <div class="container main-content">

        <section class="portfolio-archive" data-portfolio-archive>

            <!-- ── SIDEBAR FILTRO ─────────────────────────────── -->
            <aside class="portfolio-archive__sidebar">

                <h1 class="portfolio-archive__title h2">
                    <?php post_type_archive_title(); ?>
                </h1>

                <button type="button" class="portfolio-filter__toggle" aria-expanded="false" aria-controls="portfolio-filter">
                    <span>Filtra</span>
                    <span class="portfolio-filter__current" data-filter-current>Tutti</span>
                </button>

                <nav id="portfolio-filter" class="portfolio-filter" aria-label="Filtra per categoria" data-lenis-prevent>
                    <ul class="portfolio-filter__list">
                        <li>
                            <button type="button" class="portfolio-filter__btn is-active" data-filter="" aria-pressed="true">Tutti</button>
                        </li>

                        <?php foreach ($parent_terms as $parent): ?>
                            <?php
                            $children = get_terms([
                                'taxonomy'   => $taxonomy,
                                'parent'     => $parent->term_id,
                                'hide_empty' => false,
                                'orderby'    => 'name',
                            ]);
                            $children = is_wp_error($children) ? [] : $children;

                            if (!$parent->count && !$children) {
                                continue;
                            }
                            ?>
                            <li class="portfolio-filter__group">
                                <button type="button" class="portfolio-filter__btn" data-filter="<?php echo esc_attr($parent->slug); ?>" aria-pressed="false">
                                    <?php echo esc_html($parent->name); ?>
                                </button>

                                <?php if ($children): ?>
                                    <ul class="portfolio-filter__sublist">
                                        <?php foreach ($children as $child): ?>
                                            <li>
                                                <button type="button" class="portfolio-filter__btn portfolio-filter__btn--child" data-filter="<?php echo esc_attr($child->slug); ?>" aria-pressed="false">
                                                    <?php echo esc_html($child->name); ?>
                                                </button>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                <?php endif; ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </nav>

            </aside>
            <!-- ── FINE SIDEBAR ──────────────────────────────── -->

            <!-- ── GRIGLIA ──────────────────────────────────── -->
            <div class="portfolio-archive__content">

                <?php if (have_posts()): ?>
                    <div class="portfolio-grid">
                        <?php
                        while (have_posts()):
                            the_post();

                            $terms = get_the_terms(get_the_ID(), $taxonomy);
                            $terms = (is_array($terms)) ? $terms : [];

                            // Slug per il filtro: termini assegnati + loro antenati,
                            // così filtrando un genitore compaiono anche i progetti dei figli.
                            $filter_slugs = [];
                            foreach ($terms as $term) {
                                $filter_slugs[] = $term->slug;
                                foreach (get_ancestors($term->term_id, $taxonomy, 'taxonomy') as $ancestor_id) {
                                    $ancestor = get_term($ancestor_id, $taxonomy);
                                    if ($ancestor && !is_wp_error($ancestor)) {
                                        $filter_slugs[] = $ancestor->slug;
                                    }
                                }
                            }
                            $filter_slugs = array_unique($filter_slugs);

                            // In card: prima le sottocategorie (più specifiche), max 3
                            usort($terms, function ($a, $b) {
                                return ($b->parent > 0) <=> ($a->parent > 0);
                            });
                            $card_terms = array_slice($terms, 0, 3);
                            ?>

                            <article class="portfolio-card" data-terms="<?php echo esc_attr(implode(' ', $filter_slugs)); ?>">
                                <a href="<?php the_permalink(); ?>" class="portfolio-card__link">

                                    <div class="portfolio-card__media">
                                        <?php if (has_post_thumbnail()): ?>
                                            <?php the_post_thumbnail('large', ['loading' => 'lazy', 'class' => 'portfolio-card__img']); ?>
                                        <?php endif; ?>
                                    </div>

                                    <div class="portfolio-card__body">
                                        <?php if ($card_terms): ?>
                                            <ul class="portfolio-card__terms">
                                                <?php foreach ($card_terms as $term): ?>
                                                    <li><?php echo esc_html($term->name); ?></li>
                                                <?php endforeach; ?>
                                            </ul>
                                        <?php endif; ?>

                                        <h2 class="portfolio-card__title h4"><?php the_title(); ?></h2>

                                        <?php if (has_excerpt() || get_the_content()): ?>
                                            <p class="portfolio-card__excerpt">
                                                <?php echo esc_html(wp_trim_words(get_the_excerpt(), 22, '…')); ?>
                                            </p>
                                        <?php endif; ?>
                                    </div>

                                </a>
                            </article>

                        <?php endwhile; ?>
                    </div>

                    <p class="portfolio-archive__empty" data-filter-empty hidden>Nessun progetto in questa categoria.</p>

                <?php else: ?>
                    <p class="portfolio-archive__empty">Nessun progetto disponibile.</p>
                <?php endif; ?>

            </div>
            <!-- ── FINE GRIGLIA ─────────────────────────────── -->

        </section>

    </div>
</div>

<?php
get_footer();
