var qs = require("querystring");

module.exports = function parameterize(url, options) {
  var querystring = {};

  Object.keys(options).forEach(function(value) {
    // Check if the option exists in the URL string
    if (url.indexOf(value) != -1) {
      url = url.replace(":" + value, options[value]);
      return;
    }

    // Otherwise, add the parameter as an HTTP query string parameter
    if (options[value].toISOString) {
      querystring[value] = options[value].toISOString();
    } else {
      querystring[value] = options[value];
    }
  });

  if (Object.keys(querystring).length) {
    url = url + "?" + qs.stringify(querystring);
  }

  url = "https://api.github.com" + url;

  return url;
}
