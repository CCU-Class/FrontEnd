var express = require('express');
var router = express.Router();


router.get("/", function(req, res) {
  try{
    res.render("about");
  }catch(err){
    console.log(err);
  }
  
});

module.exports = router;