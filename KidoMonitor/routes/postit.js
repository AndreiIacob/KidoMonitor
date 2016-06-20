/**
 * Created by Cosmin on 6/20/2016.
 */

var express = require('express');
var router = express.Router();

router.get('/postit', function(req, res) {
    console.log(req.param("text"));
});

module.exports = router;
