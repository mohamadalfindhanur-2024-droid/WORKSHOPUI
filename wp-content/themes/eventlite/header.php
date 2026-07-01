<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <?php
    $site_url = site_url();
    $static_root = dirname($site_url) . '/';
  ?>
  <header class="site-header">
    <div class="container row" style="align-items:center; justify-content:space-between;">
      <a href="<?php echo $static_root; ?>home-customer.html" class="site-brand" style="text-decoration: none; color: inherit; font-weight: 800; display: block;">EventLite</a>
      <nav>
        <a href="<?php echo $static_root; ?>home-customer.html" style="margin-right:1rem;">Home</a>
        <a href="<?php echo $static_root; ?>katalog.html" style="margin-right:1rem;">Katalog</a>
        <a href="<?php echo $site_url; ?>/" style="margin-right:1rem;" class="active">Artikel</a>
        <a href="<?php echo $static_root; ?>history-transaksi.html" style="margin-right:1rem;">Riwayat</a>
        <a href="<?php echo $static_root; ?>keranjang.html" style="margin-right:1rem;">Keranjang</a>
        <a class="btn btn-ghost" href="<?php echo $static_root; ?>index.html">Logout</a>
      </nav>
    </div>
  </header>
