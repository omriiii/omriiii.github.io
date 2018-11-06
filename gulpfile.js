const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const sass = require('gulp-sass');
const nunjucks = require('gulp-nunjucks');

sass.compiler = require('node-sass');

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(nunjucks.compile(""))
	.pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('graphics', () => {
  return gulp.src('src/res/graphics/*')
    .pipe(gulp.dest('dist/res/graphics/'));
});
	

gulp.task('fonts', () => {
  return gulp.src('src/res/fonts/*')
    .pipe(gulp.dest('dist/res/fonts/'));
});

	
gulp.task('css', () => {
  return gulp.src('src/res/css/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
	.pipe(cleanCSS())
    .pipe(gulp.dest('dist/res/css'));
});


gulp.task('clean', function() {
  return del('dist');
});
	
gulp.task('default', gulp.series('clean', 'html', 'graphics', 'fonts', 'css'));