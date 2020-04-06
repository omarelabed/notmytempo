const fs = require('fs');
const config = JSON.parse(fs.readFileSync('private/awsaccess.json'));
const gulp = require('gulp');
const s3 = require('gulp-s3-upload')(config);
const { src, watch } = require('gulp');

function upload(cb) {
    src("./build/**")
    .pipe(s3({
        Bucket: 'notmytempo.xyz',
        ACL:    'public-read'
    }, {
        maxRetries: 5
    }));
    cb();
}


exports.upload = upload;

exports.default = function() {
    // You can use a single task
    watch('build/**', upload);
};
