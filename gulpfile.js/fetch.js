const request = require('request');
const {parallel} = require('gulp');
const fs = require('fs');
const keys = JSON.parse(fs.readFileSync('private/keys.json'));

const key = keys.sheet;
const url = "https://spreadsheets.google.com/feeds/list/"+key+"/od6/public/values?alt=json";
const keyPrefix = 'gsx$';

function fetchPeople(cb) {
    request(url, { json: true }, (err, res, body) => {
        let data = [];
        if (err) { return console.log(err); }
        for (let line of body.feed.entry) {
            let p = {suspicious: false};
            for (let k in line) {
                if (k.startsWith(keyPrefix)) {
                    let key = k.replace(keyPrefix, ''),
                    val = line[k]['$t'];
                    val = val === "TRUE" ? true : (val === "FALSE" ? false : val);
                    if (key.startsWith('_')) {
                        continue;
                    }
                    if (key === val) {
                        p.suspicious = true;
                        continue;
                    } else {
                        p[key] = val;
                    }
                }
            }
            if (p.suspicious) {
                continue;
            }
            data.push(p);
        }
        const jsonContent = JSON.stringify(data)
        fs.writeFile("./src/data/people.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });
    });
    cb();
}

exports.fetch = fetchPeople;
