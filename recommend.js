var getToIt = require('./GADLibrary.js');


if (getToIt.toRunOrNotToRun) {
    let owner = process.argv[2];
    let repo = process.argv[3];
    getToIt.getRepoContributors(owner, repo, getToIt.getStars);
}