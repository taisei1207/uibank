var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var assets = require('postcss-assets');
var cssdeclsort = require('css-declaration-sorter');
var mqpacker = require('css-mqpacker');
var browserSync = require("browser-sync");

var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");

var pug = require('gulp-pug');

var imageminOption = [
	imageminPngquant({ quality: [0.65, 0.8] }),
	imageminMozjpeg({ quality: 85 }),
	imagemin.gifsicle({
		interlaced: false,
		optimizationLevel: 1,
		colors: 256
	}),
	imagemin.jpegtran(),
	imagemin.optipng(),
	imagemin.svgo()
];

gulp.task('sass', function() {
	return gulp.src('./sass/**/*.scss')
	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([mqpacker()]))
    .pipe(postcss([cssdeclsort({order: 'smacss'})]))
    .pipe(postcss([assets({
      loadPaths: ['images/', './icons', './banners'],
      relative: true
    })]))
    .pipe(postcss([autoprefixer({
        // IEは11以上、Androidは4.4以上
        // その他は最新1バージョンで必要なベンダープレフィックスを付与する設定
	browsers: ['last 2 versions', 'ie >= 11' , 'Android >= 4'],
	grid: true,
    cascade: false
    })]))
		.pipe(sourcemaps.write())
    .pipe(gulp.dest('./pulic/'));
});

var pug = require('gulp-pug');

gulp.task('pug', () => {
	return gulp.src(['./*.pug', '!./_*.pug'])
	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./public'));
});

//Browser Syncin
gulp.task( 'browser-sync', done => {
	browserSync.init({
		server: {
			baseDir: './public/',
			index: '/index.html'
		}
	})
	done()
});

gulp.task( 'browserReload', function(done) {
	browserSync.reload();
	done();
	console.log('Browser reload completed');
});

gulp.task('sass:watch', function() {
	var watcherSass = gulp.watch('./sass/**/*.scss', gulp.task('sass'));
	watcherSass.on('change', function(event) {
	});
});

gulp.task('pug:watch', function() {
	var watcherPug = gulp.watch('./*.pug', gulp.task('pug'));
	watcherPug.on('change', function(event) {
	})
});

gulp.task("imagemin", function() {
		return gulp
		.src("./base/*.{png,jpg,gif,svg}")
		.pipe(imagemin(imageminOption))
		.pipe(gulp.dest("./public/images/"));
});

gulp.task('file-watch', function() {
	gulp.watch("**/*.html", gulp.task("browserReload"));
	gulp.watch("**/*.css", gulp.task("browserReload"));
	gulp.watch("./js/*.js", gulp.task("browserReload"));
});

// タスク"task-watch"がgulpと入力しただけでdefaultで実行されるようになる
gulp.task('default', gulp.series(gulp.parallel('browser-sync','file-watch','sass:watch', 'pug:watch')));



