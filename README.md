# [Archived] Beamitfast API Server Setup

## Pre Install

### NPM Install ###
* None

## Server Setup
* [MySQL](http://www.mysql.com)


You will need all of them to successfully start up BuddyCard API server

## Initialization
### Clone repository from BitBucket
    $ git clone https://stevenc81@bitbucket.org/stevenc81/beamitfast.git

## Install Dependent Packages
    $ npm install

## Configure
    $ cp config.default.js config.js
Modify `user` and `password` in `db` in `config.js` to match your local MySQL for testing.


## Run Server
    $ node api.js
