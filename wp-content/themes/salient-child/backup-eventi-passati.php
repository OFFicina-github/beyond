<?php
$today = current_time('Ymd');

$args = [
    'post_type' => 'evento',
    'posts_per_page' => 2,               // 🔥 solo 2
    'post_status' => 'publish',
    'meta_key' => 'data_evento',    // 🔥 ordina per data evento
    'orderby' => 'meta_value',
    'order' => 'DESC',
    'meta_query' => [
        [
            'key' => 'data_evento',
            'value' => $today,
            'compare' => '<',
            'type' => 'NUMERIC'
        ]
    ]
];

$query = new WP_Query($args);
?>

<div class="item_evento passati">
    <div class="evento-container">

        <?php if ($query->have_posts()): ?>
            <?php while ($query->have_posts()):
                $query->the_post(); ?>

                <?php
                $nome_evento = get_field('nome_evento');
                $data_evento = get_field('data_evento');
                ?>

                <div class="inner text_custom">
                    <p>
                        <?php echo esc_html(str_replace('/', '.', $data_evento)); ?>
                    </p>
                    <p>
                        <?php echo esc_html($nome_evento ?: 'TITOLO NON PRESENTE'); ?>
                    </p>
                </div>

            <?php endwhile; ?>
        <?php else: ?>
            <p>Nessun evento trovato</p>
        <?php endif; ?>

    </div>

    <div class="inner img_custom">
        <img decoding="async" class="img-with-animation skip-lazy" height="100" width="100"
            src="https://offdevelop.it/beyond/wp-content/uploads/2025/12/hand-left.svg" alt="">
        <p>EVENTI PASSATI</p>
    </div>
</div>

<?php wp_reset_postdata(); ?>