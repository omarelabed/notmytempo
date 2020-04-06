const { watch, parallel } = require('gulp');
const {upload} = require('./upload.js');
const {fetch} = require('./fetch.js');

exports.upload = upload;
exports.fetch = fetch;

exports.default = parallel(
    fetch,
    function() {
        // You can use a single task
        watch('build/**', upload);
    }
);
