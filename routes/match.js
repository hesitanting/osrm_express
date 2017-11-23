var express = require('express');
var router = express.Router();
var match = require('../models/osrm_match');

/* GET users listing. */
router.get('/', function (req, res, next) {
    options = req.query;
    on_matching(res, options);
});

router.post('/', function (req, res, next) {
    options = undefined;
    if (req.body.coordinates) {
        options = req.body
    } else {
        let body = '', jsonStr;
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            try {
                jsonStr = JSON.parse(body);
                options = jsonStr;
                on_matching(res, options)

            } catch (err) {
                res_content = {
                    err: 'json parsing error: unknown post data'
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
        } catch (e) {
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
            err: err
        };
        res.send(res_content);
    }
}

module.exports = router;
