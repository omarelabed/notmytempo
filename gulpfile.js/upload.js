const fs = require('fs');
const config = JSON.parse(fs.readFileSync('private/awsaccess.json'));
const { src } = require('gulp');
const s3 = require('gulp-s3-upload')(config);

function upload(cb) {
    src("./dist/**")
    .pipe(s3({
        Bucket: 'notmytempo.xyz',
        ACL:    'public-read'
    }, {
        maxRetries: 5
    }));
    cb();
}

exports.upload = upload;
