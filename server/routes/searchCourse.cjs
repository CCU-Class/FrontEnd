var express = require('express');
var router = express.Router();
var controller = require('../controllers/courseSearchController.cjs');
const regex = require('../../utils/myRegex.cjs');

router.get('/', async function(req, res) {
  const keyword = req.query.keyword;
  //keyword可能還要經過處理，例如去除空白、轉小寫等等
  //keyword = keyword.trim().toLowerCase();
  
  //=============讓controller幫我們查==========
  var array = null;
  if(regex.checkChineseEnglishNum(keyword)){
    array = await controller.searchCourses(keyword);
  }
  
  //console.log(array);
  res.send(array);
});

module.exports = router;



