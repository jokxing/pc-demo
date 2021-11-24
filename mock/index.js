const Mock = require('mockjs')
const fs = require("fs");
const { stringify } = require('querystring');
const getJsonData = function(module) {
  const fileJson = fs.readdirSync(`./mock${module ? "/" + module : ""}`);
  const jsonObj = {};
  fileJson.forEach(jsonName => {
    if (/.json/gi.test(jsonName)) {
      jsonObj[jsonName.split(".")[0]] = require(`.${
        module ? "/" + module : ""
      }/${jsonName}`);
    }
  });
  return jsonObj;
};

const baseURL = "/api";


function setRequestURL(requestMethod, requestURL) {
  const temp = `${requestMethod} ${baseURL}${requestURL}`;
  return temp.replace(/\"/g, "");
}

const testData = Mock.mock(getJsonData('test'));

const test = {
  [setRequestURL("POST", '/authorizations')]: (req, res) => {
    const { password, username } = req.body;
    if(username == '123123' && password == '12345678'){
      return res.json(testData.authorizations.success);
    }else{
      return res.status(412).json(testData.authorizations.error);
    }
  },
  [setRequestURL("GET", '/announcement')]: (req, res) => {
    if(req.query.type == '跑马灯1'){
      return res.json(testData.announcement);
    }else{
      return res.json(testData.announcementList);
    }
  },
  [setRequestURL("GET", '/init')]: testData.init,
  [setRequestURL("GET", '/user')]: testData.user,
  [setRequestURL("GET", '/ActGiftDetail')]: (req, res) => {
    if(req.query.type == 'DptGift'){
      return res.json(testData.ActGiftDetailDptGift);
    }else if (req.query.type == 'UsdtRefund') {
      return res.json(testData.ActGiftDetailUsdtRefund);
    }else if (req.query.type == 'SignBonus') {
      return res.json(testData.ActGiftDetailSignBonus);
    }else if (req.query.type == 'ChessRank') {
      return res.json(testData.ActGiftDetailChessRank);
    }else{
      return res.json(testData.ActGiftDetail);
    }
  },
  [setRequestURL("GET", '/KingMealInfo')]: testData.KingMealInfo,
  [setRequestURL("GET", '/uservipinfo')]: testData.uservipinfo,
  [setRequestURL("POST", '/depositInit')]: testData.depositInit,
  [setRequestURL("GET", '/listen')]: testData.listen,
  [setRequestURL("GET", '/withdrawInit')]: testData.withdrawInit,
  [setRequestURL("POST", '/account')]: testData.account,
  [setRequestURL("GET", '/mypurse')]: testData.mypurse,
  [setRequestURL("POST", '/tradeRec')]: testData.tradeRec,
  [setRequestURL("GET", '/message')]: testData.message,
}
 
module.exports = Object.assign(
  test
);