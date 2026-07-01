<?php
get_header(); ?>
<main class="container mt-2" style="min-height: 75vh;">
  <h2>Arsip Artikel</h2>
  <p class="text-muted small">Kumpulan berita, tips, dan update seputar konser musik di Indonesia (dikelola lewat CMS WordPress).</p>

  <section class="grid-events mt-2" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <article class="event-card" style="background: var(--card); color: var(--text); border: 1px solid rgba(255,255,255,0.03); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <?php if ( has_post_thumbnail() ) : ?>
            <div style="margin-bottom:0.75rem;">
              <?php the_post_thumbnail('medium', array('style' => 'width:100%; height:180px; object-fit:cover; border-radius:8px;')); ?>
            </div>
          <?php endif; ?>
          <h3 style="margin:0; font-size: 1.2rem; color: var(--text); font-weight:700;"><?php the_title(); ?></h3>
          <div class="meta small" style="color: var(--muted); font-size: 0.8rem; margin-top: 0.25rem; margin-bottom:0.5rem;">
            <?php echo get_the_date(); ?> • <?php the_category(', '); ?>
          </div>
          <div class="excerpt" style="font-size:0.9rem; color: var(--muted); line-height:1.4;">
            <?php the_excerpt(); ?>
          </div>
        </div>
        <div style="margin-top:1rem;">
          <a class="btn btn-primary" style="padding: 6px 12px; font-size: 0.85rem; width:100%; text-align:center; display:block;" href="<?php the_permalink(); ?>">Baca Selengkapnya</a>
        </div>
      </article>
    <?php endwhile; else : ?>
      <p>Belum ada artikel. Silakan tambahkan postingan baru lewat admin WordPress.</p>
    <?php endif; ?>
  </section>
</main>
<?php get_footer();
