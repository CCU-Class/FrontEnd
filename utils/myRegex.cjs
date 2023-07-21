

var regex = new RegExp("^[\u4E00-\u9FA5A-Za-z0-9]+$");

function checkChineseEnglishNum(str){
    return regex.test(str);
}

module.exports = {
    checkChineseEnglishNum: checkChineseEnglishNum
}