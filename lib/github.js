var request = require("request");

var parameterize = require("./parameterize");

var github = {
  repos: {
    commits: {
      list: function(options, callback) {
        var url = parameterize("/repos/:owner/:repo/commits", options)

        request(url, function(error, response, body) {
          callback(error, JSON.parse(body));
        });
      }
    }
  }
};

module.exports = github;
