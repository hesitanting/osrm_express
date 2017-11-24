var OSRM = require("../node_modules/osrm/lib/index");
var osrm = new OSRM("../data/portugal-latest.osrm");



function matching(options,callback) {
    osrm.match(options, function(err, response) {
        // if (err) throw err;
        callback(err,response);
        // console.log(response.tracepoints); // array of Waypoint objects
        // console.log(response.matchings); // array of Route objects
    });
}

module.exports = {
	matching:matching
};
