<?php
$today = current_time('Ymd');

$args = [
    'post_type' => 'evento',
    'posts_per_page' => 1,
    'post_status' => 'publish',
    'meta_key' => 'data_evento',
    'orderby' => 'meta_value',
    'order' => 'ASC',
    'meta_query' => [
        [
            'key' => 'data_evento',
            'value' => $today,
            'compare' => '>=',
            'type' => 'NUMERIC'
        ]
    ]
];

$query = new WP_Query($args);
?>

<div class="item_evento futuri">
    <div class="inner img_custom">
        <img decoding="async" class="img-with-animation skip-lazy" height="100" width="100"
            src="https://offdevelop.it/beyond/wp-content/uploads/2025/12/hard-right.svg" alt="">
        <p>EVENTI FUTURI</p>
    </div>

    <?php if ($query->have_posts()): ?>
        <?php while ($query->have_posts()):
            $query->the_post(); ?>

            <?php
            $nome_evento = get_field('nome_evento');
            $data_raw = get_field('data_evento');
            ?>

            <a href="<?php echo esc_url(get_permalink()); ?>">

                <div class="inner text_custom color_y">
                    <p>
                        <?php echo esc_html(str_replace('/', '.', $data_raw)); ?>
                    </p>
                    <p><?php echo esc_html($nome_evento); ?></p>
                </div>

            </a>

        <?php endwhile; ?>
    <?php else: ?>
        <div class="inner text_custom color_y">
            <p>Stay tuned</p>
        </div>
    <?php endif; ?>
</div>

<?php wp_reset_postdata(); ?>