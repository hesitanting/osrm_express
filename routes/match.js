var express = require('express');
var router = express.Router();
var match = require('../models/osrm_match');

/* GET users listing. */
router.get('/', function(req, res, next) {
    options= req.query;
    for (let param in options) {
        try {
            options[param] = JSON.parse(options[param])
        } catch (e) {
            continue;
        }
    }
    try{
        match.matching(options,function (match_err,match_res) {
            result = {
                err:match_err,
                data:match_res
            };
            res.send(result);
        })
    }catch (e){

    }
});

router.post('/',function (req,res,next) {

    options= req.body;
    for (let param in options) {
        try {
            options[param] = JSON.parse(options[param])
        } catch (e) {
            continue;
        }
    }
    try{
        match.matching(options,function (match_err,match_res) {
            result = {
                err:match_err,
                data:match_res
            };
            res.send(result);
        })
    }catch (e){

    }

});

module.exports = router;
