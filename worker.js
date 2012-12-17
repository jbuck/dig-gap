var config = require("./repos");
var Client = require("./lib/client");
var c = new Client(config);

c.poll();
