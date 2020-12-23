const {src,dest,parallel} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const minify = require('gulp-minify');

function buildHTML(cb) {
    src('./src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./dist'));
    cb();
}

function buildCSS(cb) {
    src('./src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('./dist/css'));
    cb();
}

function buildJS(cb) {
    src('./src/js/**/*.js')
    .pipe(minify())
    .pipe(dest('./dist/js'));
    cb();
}

function copyData(cb) {
    src('./src/data/**/*.json')
    .pipe(dest('./dist/data'));
    cb();
}

function copyAssets(cb) {
    src(['./src/assets/**'])
    .pipe(dest('./dist/assets'));
    cb();
}

function copyLabels(cb) {
    src('./src/labels/**')
    .pipe(dest('./dist/labels'))
    cb()
}

exports.buildHTML = buildHTML;
exports.buildCSS = buildCSS;
exports.buildJS = buildJS;
exports.copyData = copyData;
exports.copyAssets = copyAssets;

exports.build = parallel(buildCSS, buildHTML, buildJS, copyData, copyAssets, copyLabels);
