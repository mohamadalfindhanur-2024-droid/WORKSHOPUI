<?php
/*
Template Name: EventLite Page
Description: Minimal WordPress page template styled for EventLite static theme.
*/
get_header(); ?>

<div class="container" style="padding:2rem 1rem; max-width:1000px;">
  <header style="margin-bottom:1rem;">
    <h1><?php the_title(); ?></h1>
  </header>

  <main>
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <article>
        <div class="entry-content">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; endif; ?>
  </main>

  <aside style="margin-top:2rem;">
    <h3>EventLite</h3>
    <p class="small text-muted">Gunakan template ini untuk membuat halaman statis yang konsisten di WordPress.</p>
  </aside>
</div>

<?php get_footer();
