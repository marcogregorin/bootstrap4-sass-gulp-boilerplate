'use strict';

// Set Variables
var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	maps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	htmlreplace = require('gulp-html-replace'),
	autoprefixer = require('gulp-autoprefixer'),
	browsersync = require('browser-sync').create();

// JS Tasks
function concatJs() {
	return gulp.src([
			'./node_modules/jquery/dist/jquery.min.js',
			'./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
			'./assets/js/functions.js'
		])
		.pipe(maps.init())
		.pipe(concat('main.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./assets/js'))
		.pipe(browsersync.stream());
}

// CSS Tasks
function compileSass() {
	return gulp.src('./assets/scss/main.scss')
		.pipe(maps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./assets/css'))
		.pipe(browsersync.stream());
}



// Dist Tasks
function cleanDist() {
	return del('./dist**');
}

function build() {
	return gulp.src([
			'./assets/img/**/*'
		], {
			base: './'
		})
		.pipe(gulp.dest('./dist'));
}

function renameSources() {
	return gulp.src('./*.html')
		.pipe(htmlreplace({
			'js': 'assets/js/main.js',
			'css': 'css/main.css'
		}))
		.pipe(gulp.dest('./dist'));
}


function minifyCss() {
	return gulp.src('./assets/css/main.css')
		.pipe(cleancss())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('./dist/assets/css'));
}

function minifyJs() {
	return gulp.src('./assets/js/main.js')
		.pipe(uglify())
		.pipe(rename('main.js'))
		.pipe(gulp.dest('./dist/assets/js'));
}

gulp.task('dist', gulp.series(cleanDist, build, renameSources, compileSass, minifyCss, concatJs, minifyJs));

// Default Task
gulp.task('default', gulp.series(compileSass, concatJs));





// Dev Tasks
function watch() {
	browsersync.init({
		server: './'
	});
	gulp.watch('./assets/scss/**/*.scss', gulp.series(compileSass));
	gulp.watch(["./assets/js/**/*.js", "!./js/main.js", '!./js/*.map'], concatJs);
	gulp.watch('./**/*.html').on('change', browsersync.reload);
}

gulp.task('dev', gulp.series('default', watch));
