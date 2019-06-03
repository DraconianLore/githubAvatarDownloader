var request = require('request');
var secret = require('./secrets.js').GITHUB_TOKEN;

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





getRepoContributors('robbyrussell', 'oh-my-zsh', function(err, results) {
    console.log('errors:', err);
    let contribs = JSON.parse(results)
    for (let people of contribs) {
        console.log(people.login, people.avatar_url);
    }
    // console.log('Results:', contribs);

});