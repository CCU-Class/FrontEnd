var express = require('express');
var router = express.Router();
var parser = require('xml2js');
var fs = require('fs');


router.get("/", function(req, res) {
    // res.type('application/xml');
    res.set("Content-Type", "text/xml");
    var xml = fs.readFileSync('./sitemap.xml',{encoding:'utf8'});
    // console.log(`xml=${xml}`);
    res.send(xml);
    
});

module.exports = router;