var request = require('request');
require('dotenv').config();
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + process.env.GITHUB_TOKEN
        }
    };
    request(options, function(err, res, body) {
        // check if repo and owner exist before continuing
        if (res.statusCode === 200) {
            cb(err, body, repoName);
        } else {
            console.log('\nERROR: Invalid Repository Owner or Repository')
        }
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
    if (err) {
        return;
    }
    let contribs = JSON.parse(results);
    let localURL = './avatars/' + repo + '-';
    for (let people of contribs) {
        downloadImageByURL(people.login, people.avatar_url, localURL);
    }
}

// Check for errors, if any are found don't run the application
let toRunOrNotToRun = function() {
    if (!process.env.GITHUB_TOKEN) {
        console.log('\nPlease create a .env file with your github token\n---> GITHUB_TOKEN=[your github token]')
        return false;
    }
    if (!fs.existsSync('./avatars')) {
        console.log('\nERROR: Missing Folder');
        console.log('Please create a folder named "avatars"');
        return false;
    }
    if (!process.argv[3]) {
        console.log('\nPlease enter a Repository Owner and a Repository:\n---> node download_avatars.js [repository owner] [repository]');
        return false;
    }
    return true;
}

let getStars = function(err, information, repo) {
    information = JSON.parse(information)
    let starredRepos = {};
    let options = {};
    for (let people of information) {
        options = {
            url: 'https://api.github.com/users/' + people.login + '/starred',
            headers: {
                'User-Agent': 'request',
                'Authorization': 'token ' + process.env.GITHUB_TOKEN
            }
        };
        request(options, function(err, res, body) {
            body = JSON.parse(body);
            for (let stars of body) {
                let starredRepo = stars.full_name;
                if (starredRepos[starredRepo]) {
                    starredRepos[starredRepo]++;
                } else {
                    starredRepos[starredRepo] = 1;
                }
            }
        })

    }
    setTimeout(function() {
        let sortedRepos = [];
        for (let repos in starredRepos) {
            sortedRepos.push([repos, starredRepos[repos]]);
        }
        sortedRepos.sort(function(a, b) {
            return a[1] - b[1];
        })
        let finalSort = [];
        for (let i = sortedRepos.length - 1; i > sortedRepos.length - 6; i--) {
            finalSort.push(sortedRepos[i]);
        }
        for (let i = 0; i < finalSort.length; i++) {
            console.log('[', finalSort[i][1], 'stars ]', finalSort[i][0])
        }


    }, 3000);


}



module.exports = {
    toRunOrNotToRun: toRunOrNotToRun,
    getRepoContributors: getRepoContributors,
    downloadImageByURL: downloadImageByURL,
    saveImages: saveImages,
    getStars: getStars
}