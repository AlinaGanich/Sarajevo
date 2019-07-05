//Подключение 
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');


/*
const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
]
*/
const lessFiles = [
    './src/less/main.less',
    './src/less/_variables.less',
    './src/less/_banner.less',
    './src/less/_feature.less',
    './src/less/_thirdPart.less',
    './src/less/_fourthPart.less',
    './src/less/_fifthPart.less',
    './src/less/_sixthPart.less',
    './src/less/media.less'
]

const jsFiles = [
        './src/js/lib.js',
        './src/js/main.js'
    ]
    //Таск на стили less
function styles() {
    return gulp.src(lessFiles)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('style.css'))

    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

//Таск на JS
function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());

}

function clean() {
    return del(['build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/less/**/*.less', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);

gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));