var OSRM = require("./node_modules/osrm/lib")
var osrm = new OSRM("./data/portugal-latest.osrm");

var options = {
    coordinates: [[13.393252,52.542648],[13.39478,52.543079],[13.397389,52.542107]],
        timestamps: [1424684612, 1424684616, 1424684620]
	};
	osrm.match(options, function(err, response) {
	    if (err) throw err;
	        console.log(response.tracepoints); // array of Waypoint objects
		    console.log(response.matchings); // array of Route objects
		    });
