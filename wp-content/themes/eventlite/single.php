<?php
get_header(); ?>
<main class="container mt-2" style="min-height: 75vh;">
  <article class="article-content" style="max-width: 800px; margin: 0 auto;">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <h1 style="margin-top:0; font-size: 2.2rem; color:var(--text); font-weight:800;"><?php the_title(); ?></h1>
      <div class="meta small text-muted" style="margin-bottom: 1.5rem;">
        <?php echo get_the_date(); ?> • <?php the_category(', '); ?> • Oleh <?php the_author(); ?>
      </div>

      <section style="line-height: 1.8; color: var(--text); font-size:1.05rem;">
        <?php the_content(); ?>
      </section>
    <?php endwhile; endif; ?>
    
    <div style="margin-top: 3rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem;">
      <a class="btn btn-ghost" href="<?php echo site_url(); ?>/">&larr; Kembali ke Daftar Artikel</a>
    </div>
  </article>
</main>
<?php get_footer();
