'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	del = require('del'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	prefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;


gulp.task('html', function () {
	gulp.src('app/index.html')
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream: true}));
});

gulp.task('style', () => {
	gulp.src('app/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass.sync({
		  outputStyle: 'expanded',
		  precision: 10,
		  includePaths: ['.']
		}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/css/'))
		.pipe(reload({stream: true}));
});

gulp.task('image', () => {
	gulp.src('app/images/**/*.*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			interlaced: true
		}))
		.pipe(gulp.dest('build/images/'))
		.pipe(reload({stream: true}));
});

gulp.task('font', () => {
	gulp.src('src/fonts/**/*.*').pipe(gulp.dest('build/fonts/'));
});

gulp.task('webserver', () => {
	browserSync({
		server: {
			baseDir: "./build"
		},
		tunnel: false,
		host: 'localhost',
		port: 9000
	});
});

gulp.task('clean', del.bind(null, ['build']));

gulp.task('watch', () => {
	gulp.watch(['app/html/**/*.*', 'app/index.html'], ['html']);
	gulp.watch('app/scss/**/*.scss', ['style']);
	gulp.watch('app/images/**/*.*', ['image']);
	gulp.watch('app/fonts/**/*.*', ['font']);
});

gulp.task('build', ['html', 'style', 'font', 'image' ]);

gulp.task('default', ['clean'], () => {
  gulp.start(['clean', 'build', 'webserver', 'watch']);
});

