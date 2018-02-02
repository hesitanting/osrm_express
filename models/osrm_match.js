var OSRM = require("../node_modules/osrm/lib/index");
var osrm_car = new OSRM("../data/car_lua/portugal-latest.osrm");
var osrm_test = new OSRM("../data/test_lua/portugal-test.osrm");


function matching(profile, options, callback) {
    var osrm_model;
    switch (profile) {
        case 'car': {
            osrm_model = osrm_car;
            break;
        }
        case 'test': {
            osrm_model = osrm_test;
            break;
        }
        default: {
            osrm_model = osrm_car;
        }
    }

    osrm_model.match(options, function (err, response) {
        // if (err) throw err;
        callback(err, response);
        // console.log(response.tracepoints); // array of Waypoint objects
        // console.log(response.matchings); // array of Route objects
    });
}


module.exports = {
    matching: matching
};
