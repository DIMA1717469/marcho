const { src, dest, watch, parallel, series } = require('gulp');

const scss             = require('gulp-sass')(require('sass'));
const concat           = require('gulp-concat');
const autoprefixer     = require('gulp-autoprefixer');
const uglify           = require('gulp-uglify');
const imagemin         = require('gulp-imagemin');
const del              = require('del');
const browserSync      = require('browser-sync').create();


//2
function browsersync(){
  browserSync.init({
    server:{
      baseDir: 'app/'
    },


    notify: false
  })
}

// SCSS
function styles() {
  return src('app/scss/style.scss')
  .pipe(scss({outputStyle: 'expanded'}))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({overrideBrowserslist:
    ['last 10 version'],
  grid:true
}))
  .pipe(dest('app/css'))
  //2
  .pipe(browserSync.stream())
}

// JS
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'app/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))

  //2
  .pipe(browserSync.stream())
}

//  images
function images(){
  return src('app/images/**/*.*')
  .pipe(imagemin([
  imagemin.gifsicle({interlaced: true}),
	imagemin.mozjpeg({quality: 75, progressive: true}),
	imagemin.optipng({optimizationLevel: 5}),
	imagemin.svgo({
		plugins: [
			{removeViewBox: true},
			{cleanupIDs: false}
		]
	})
  ]))
  .pipe(dest('dist/images'))
}

//build створює папку і додає зразу images
function build() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ],{base: 'app'})
  .pipe(dest('dist'))
}

//de видаляє папку dist
function cleanDist() {
  return del('dist')
}

//watching
function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', 'app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}
 

exports.styles  = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build)

//слідкує за проєктом
exports.watching = watching;

// default gulp
exports.default = parallel(styles, scripts, browsersync, watching);