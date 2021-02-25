const router = require('express').Router();
const member = require('../models/member');
const bodyParser = require('body-parser'); //設定取得req.body
router.use( bodyParser.json() ); //req.body支援json格式
router.use( bodyParser.urlencoded( { extended : true} ) ); //解析內容 

router.post('/getdata', async(req, res)=>{
  let memberList =await member.member(req, res);
  res.send({memberList:memberList});
});

router.post('/rg', async(req, res)=>{
  let memberList = await member.register(req,res);
  res.send(memberList);
})

router.post('/login', async(req, res)=>{
  let memberList = await member.login(req,res);
  res.send(memberList);
})


module.exports = router;