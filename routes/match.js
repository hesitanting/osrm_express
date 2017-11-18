var express = require('express');
var router = express.Router();
var match = require('../models/osrm_match');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond in match');
});

router.post('/',function (req,res,next) {

    options={};
    options['coordinates'] = JSON.parse(req.param('coordinates'));
    options['timestamps'] = JSON.parse(req.param('timestamps'));

    match.matching(options,function (match_err,match_res) {
        result = {
            err:match_err,
            data:match_res
        };
        res.send(result);
    })
});

module.exports = router;
