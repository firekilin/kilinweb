const router = require('express').Router();
const member = require('../models/member');

router.get('/index', async(req, res)=>{
  res.render('index');
});

router.get('/register', async(req, res)=>{
  res.render('register');
});

router.get('/login', async(req, res)=>{
  console.log(await member.login2(req, res));
  if(await member.login2(req, res)){
    res.redirect("index");
  }else{
    res.render('login');// file login
  } 
});// path(\login)

router.get('/english', async(req, res)=>{
  res.render("english");
});


module.exports = router;