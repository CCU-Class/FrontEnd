var express = require('express');
var router = express.Router();
var parser = require('xml2js');
var fs = require('fs');


router.get("/", function(req, res) {

    //show ./robots.txt content
    res.set("Content-Type", "text/plain");
    var txt = null;
    txt = fs.readFileSync('./robots.txt',{encoding:'utf8'});
    // console.log(`txt=${txt}`);
    res.send(`${txt}`);
    
});

module.exports = router;