const { src, dest, watch, parallel, series } = require('gulp');

const scss             = require('gulp-sass')(require('sass'));
const concat           = require('gulp-concat');
const autoprefixer     = require('gulp-autoprefixer');
const uglify           = require('gulp-uglify');
const imagemin         = require('gulp-imagemin');
const rename           = require('gulp-rename');
const nunjucksRender   = require('gulp-nunjucks-render');
const del              = require('del');
const browserSync      = require('browser-sync').create();


//МОДУЛЬНІСТЬ
function nunjucks() {
  return src('app/*.njk')
    .pipe(nunjucksRender())
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}//МОДУЛЬНІСТЬ//



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
// function styles() {
//   return src('app/scss/style.scss')
//     .pipe(scss({ outputStyle: 'expanded' }))
//     .pipe(concat('style.min.css'))
//     .pipe(autoprefixer({
//       overrideBrowserslist:
//         ['last 10 version'],
//       grid: true
//     }))
//     .pipe(dest('app/css'))
//     //2
//     .pipe(browserSync.stream())
// }



// SCSS
function styles() {
  return src('app/scss/*.scss')
  .pipe(scss({outputStyle: 'expanded'}))
  // .pipe(concat())
  .pipe(rename({
    suffix: '.min'
  }))
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
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
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
  watch(['app/**/*.scss'], styles);
  //МОДУЛЬНІСТЬ
  watch(['app/*.njk'], nunjucks);
  //МОДУЛЬНІСТЬ//
  watch(['app/js/**/*.js', 'app/js/main.min.js'], scripts);
   //2
  watch(['app/**/*.html']).on('change', browserSync.reload);
}
 

exports.styles  = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.images = images;

//МОДУЛЬНІСТЬ
  exports.nunjucks = nunjucks;
//МОДУЛЬНІСТЬ///

exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build)

//слідкує за проєктом
exports.watching = watching;

// default gulp
exports.default = parallel(nunjucks, styles, scripts, browsersync, watching);