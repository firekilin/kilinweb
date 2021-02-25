const db = require('./getDB');
const query = db.query;


exports.register = async(req, res)=>{
  let account = req.body.account;
  let password = req.body.ps;
  let name = req.body.nickname;
  let phone = req.body.tel;
  let check = await query('SELECT * from MEMBER WHERE Member_account = ?', [account]);

  if(check.length===0){
    let add = await query(`INSERT INTO MEMBER(Member_account,Member_ps,Member_name,Member_phone) VALUES ('`+account+`','`+password+`','`+name+`','`+phone+`');`);
    if(add.affectedRows == 1){
      return "註冊成功";
    }else{
      return "註冊失敗";
    }
  }else{
    return "此帳號已被註冊";
  }//else(重複註冊)
}//(rg)


exports.login = async(req, res)=>{
  let account = req.body.account;
  let password = req.body.ps;
  let check = await query('SELECT * from MEMBER WHERE Member_account = ? AND Member_ps = ?', [account,password]);

  if(check.length == 1){
    res.cookie("account",account);
    res.cookie("ps",password);
    return "登入成功"
  }//if( set cookies)
  else{
    return "登入失敗";
  }//else(登入失敗)
}//(login)


exports.login2 = async(req, res)=>{
  let account = req.cookies.account;
  let password = req.cookies.ps;

  if(account !="" && password !=""){
      let check = await query('SELECT * from MEMBER WHERE  Member_account = ? AND  Member_ps= ?', [account,password]);
      if(check.length == 1){
        return true;
      }else{
        return false;
      }
  }else{
    return false;
  }
}//(login2)


module.exports = exports;