var github = require("./github"),
    ducksnode = require("ducksnode").create({
      api_key: process.env.API_KEY
    });

var Client = function(config) {
  this.config = config || {};
  this.lastChecked = lastHour();
  this.timeout = null;
};

Client.prototype.poll = function() {
  console.log("Scheduled check in " + msToNextHour() + "ms");
  this.timeout = setTimeout(this.check.bind(this), msToNextHour());
};

Client.prototype.check = function() {
  var repos = this.config.repos,
      checkTime = new Date();

  repos.forEach(function(repo) {
    // Hourly collection
    if (repo.period == 1) {
      github.repos.commits.list({
        owner: repo.owner,
        repo: repo.repo,
        since: this.lastChecked
      }, function(err, commits) {
        console.log(repo.owner + "/" + repo.repo + " has " + commits.length + " commits");
        ducksnode.push(repo.widget, {
          timestamp: Date.parse(checkTime),
          value: commits.length
        });
      });
    }
  }, this);

  this.lastChecked = checkTime;
  this.poll();
};

module.exports = Client;

function lastHour() {
  var lastHour = new Date();
  lastHour.setMinutes(0);
  lastHour.setSeconds(0);
  lastHour.setMilliseconds(0);

  return lastHour;
}

function msToNextHour() {
  var now = new Date();
  return 60 * 60 * 1000 -
         now.getMinutes() * 60 * 1000 -
         now.getSeconds() * 1000 -
         now.getMilliseconds();
}
