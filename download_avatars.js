var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

}





getRepoContributors('robbyrussell', 'oh-my-zsh', function(err, results) {
    console.log('errors:', err);
    console.log('Results:', results);

});