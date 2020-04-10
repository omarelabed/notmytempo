const { watch, parallel } = require('gulp');
const {upload} = require('./upload.js');
const {fetch} = require('./fetch.js');
const { build, buildJS, buildCSS, buildHTML, copyData, copyAssets } = require('./build.js');

function watchDist() {
    watch('./dist/**', upload);
}

function watchSrc() {
    watch('./src/js/**/*.js', buildJS);
    watch('./src/scss/**/*.scss', buildCSS);
    watch('./src/**/*.html', buildHTML);
    watch('./src/data/**/*.json', copyData);
    watch('./src/assets/**', copyAssets);
}

exports.upload = upload;
exports.fetch = fetch;
exports.build = build;

exports.default = parallel(fetch, build, watchDist, watchSrc);
