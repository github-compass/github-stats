import GithubApi from 'github4';
import processUser from './process-user-aa';
import processAllStargazers from './processAllStargazers';
import getAllStarsFromUser from './get-all-stars-from-user'
import _ from 'lodash';
import bunyan from 'bunyan';
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
let log = bunyan.createLogger({
  name: 'main',
  streams: [{
    path: path.resolve(__dirname + '/../logs/bunyan.log')
  }]
});

let github = new GithubApi({
  debug: true,
  version: "3.0.0",
  protocol: "https",
  timeout: 5000,
  headers: {
    "user-agent": "github-compass"
  }
});

github.authenticate({
  type: "basic",
  username: process.env.GHUSER,
  password: process.env.GHPW
});
Promise.promisifyAll(github.repos);
Promise.promisifyAll(github.users);
Promise.promisifyAll(github.activity);


// getAllStarsFromUser(github, "dpastoor", 2, 100, false).then(res => {
//   console.log(res)
// });

github.activity.starRepoAsync({user: "dpatoor", repo: "lpgitbook"})
  .then(res => log.info("starred"))
  .catch(err => log.warn("ERROR", {err}))