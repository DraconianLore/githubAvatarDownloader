var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + secret
        }
    };
    request(options, function(err, res, body) {
        cb(err, body, repoName);
    })
}

function downloadImageByURL(name, url, filePath) {
    request.get(url)
        .on('error', function(err) {
            throw err;
        })
        .on('response', function() {
            console.log('Getting avatar for ' + name)
        })
        .pipe(fs.createWriteStream(filePath + name + '.jpg'))
}

let saveImages = function(err, results, repo) {
    console.log('errors:', err);
    let contribs = JSON.parse(results);
    let localURL = './avatars/' + repo + '-';
    for (let people of contribs) {
        downloadImageByURL(people.login, people.avatar_url, localURL);
    }



}
// Check for command line arguments, run if they exist, stop if they dont
if (process.argv[3]) {
    let owner = process.argv[2];
    let repo = process.argv[3];
    getRepoContributors(owner, repo, saveImages);
} else {
    console.log('Please enter a Repository Owner and a Repository:\n---> node download_avatars.js [repository owner] [repository]');
}