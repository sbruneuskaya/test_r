const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const image = require('gulp-image');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    })
}

function html() {
    return src('src/index.pug')
        .pipe(
            pug({
                pretty:true,
            })
        )
        .pipe(dest('build'))
        .pipe(browserSync.stream())
}

function css() {
    return src('src/assets/styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            grid: 'autoplace',
        }))
        .pipe(cleanCSS())
        .pipe(dest('build/assets/styles'))
        .pipe(browserSync.stream())
}

function images() {
    return src('src/assets/images/**/*')
        .pipe(image())
        .pipe(dest('build/assets/images'))
        .pipe(browserSync.stream())
}

function fonts() {
    return src('src/assets/fonts/**/*')
        .pipe(dest('build/assets/fonts'))
        .pipe(browserSync.stream())
}

function js() {
    return src('src/assets/js/**/*')
        .pipe(dest('build/assets/js'))
        .pipe(browserSync.stream())
}

function clear() {
    return del('build', {force: true});
}


function startWatch() {
    watch('src/**/*.pug', html)
    watch('src/assets/styles/**/*.scss', css)
    watch('src/assets/images/**/*', images)
    watch('src/assets/fonts/**/*', fonts)
    watch('src/assets/js/**/*', js)
}

exports.dev = parallel(browsersync, startWatch, html, css, images, fonts, js)
exports.build = series(clear, parallel(html, css, images, fonts, js))


exports.default = parallel(browsersync, startWatch, html, css, images, fonts, js)
