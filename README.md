# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js owner repository`
or:
`node reccomend.js owner repository` for a list of recommended repositories

Requires you to have a github token in a file named `.env` formatted as: `GITHUB_TOKEN=[your github token]`
