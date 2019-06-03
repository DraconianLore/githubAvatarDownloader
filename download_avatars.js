var request = require('request');
var secret = require('./secrets.js').GITHUB_TOKEN;
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
        cb(err, body);
    })
}

function downloadImageByURL(name, url, filePath) {
    request.get(url)
        .on('error', function(err) {
            throw err;
        })
        .on('response', function(response) {
            console.log('Getting avatar for ' + name)
        })
        .pipe(fs.createWriteStream(filePath + name + '.jpg'))
}




getRepoContributors('robbyrussell', 'oh-my-zsh', function(err, results) {
    console.log('errors:', err);
    let contribs = JSON.parse(results)
    for (let people of contribs) {
        downloadImageByURL(people.login, people.avatar_url, './avatars/');
    }

});