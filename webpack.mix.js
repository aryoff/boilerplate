const mix = require('laravel-mix');

/* Allow multiple Laravel Mix applications*/
require('laravel-mix-merge-manifest');
mix.mergeManifest();

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/admin.js', 'public/js')
    .extract(['axios', 'lodash', 'moment', 'popper.js', 'jquery', 'jquery-ui-bundle', 'bootstrap', 'admin-lte', 'overlayscrollbars', 'vue', 'vue-router'])
    .copy('node_modules/sparklines/source/sparkline.js', 'public/js')
    .copy('node_modules/admin-lte/dist/img', 'public/dist/img')
    .sass('resources/sass/vendor.scss', 'public/css')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/admin.scss', 'public/css')
    .copy('resources/assets/images', 'public/images')
    .browserSync('http://localhost:8000')
    .disableNotifications();

if (mix.inProduction()) {
    mix.version().disableNotifications();
}
    