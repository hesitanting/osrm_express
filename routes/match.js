var express = require('express');
var router = express.Router();
var match = require('../models/osrm_match');

/* GET users listing. */
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    options = req.query;
    on_matching(res, options);
});

router.post('/', function (req, res, next) {
    if (req.body.coordinates) {
        options = req.body;
        on_matching(res,options);
    } else {
        let body = '', jsonStr;
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            try {
                jsonStr = JSON.parse(body);
                options = jsonStr;
                on_matching(res, options);

            } catch (err) {
                res_content = {
                    err: err.message
                };
                res.send(res_content)
            }
        })
    }
});

function on_matching(res, options) {
    for (let param in options) {
        try {
            options[param] = JSON.parse(options[param]);
        } catch (err) {
        }
    }
    try {
        match.matching(options, function (match_err, match_res) {
            result = {
                err: match_err,
                data: match_res
            };
            res.send(result);
        })
    } catch (err) {
        res_content = {
            err: err.message
        };
        res.send(res_content);
    }
}

module.exports = router;
