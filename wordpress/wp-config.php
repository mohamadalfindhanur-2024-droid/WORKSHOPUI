<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'eventlite_db' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '+<|J^( om4A$PDnnN{mM-~]zrvM](G|i.YH1 D.tH2~Ql+ucX_*kTi@Rl8^C>@=m' );
define( 'SECURE_AUTH_KEY',  'JtR 4xl`QLrEf<2*dc&d)0og&Rfno#[mRT3aL* oRHD3hxPww:xcjrW${7jhm$Id' );
define( 'LOGGED_IN_KEY',    ',KQNp;jY-B66q3sib9`&r0Pgo$2q>f3i!5G=!8>1;=7ybMls_6BC.y}O94k#%OU=' );
define( 'NONCE_KEY',        'oNsx.b/&}_p#~,yv{j/Zd*c2E4VuHf|nj.^Z}ALC_#A7(/[ 3i(q_CRN~1S}Zj*=' );
define( 'AUTH_SALT',        'ee5q<t+o+TBuZ^XBLTwfN[IuH!JuUr&q{B]zvv%4P`C0K%7,aqnilI1Efm)u}<*d' );
define( 'SECURE_AUTH_SALT', '(^)kFH3Rq7ZfMH>RZxbHjx80EIvY?>0GkgtRDr_<6X0xEOIy]H$V2-z-+|TF=>0!' );
define( 'LOGGED_IN_SALT',   'vym@EyMVBc0=mPJ-KlkND+_S?U?&3u9ELC.%=8G9vdN6jaeVRxiid]@qVSq2pE6u' );
define( 'NONCE_SALT',       '4:V$/:ABs{M,Vud&}C+!IxBDH6fUo>2o3-_W^^N3]pO&hwm6/w]/fQpAg^_,Z).A' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
