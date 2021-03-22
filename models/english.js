const db = require('./getDB');
const query = db.query;


exports.getEnglish = async(req, res)=>{
  let okList = JSON.parse(req.body.okList);
  let engList = await query('SELECT * FROM english_word;');
  let itemNum = Math.floor(Math.random()*(engList.length));

  if(okList.length!=0){
    if(okList.length==engList.length){
      return "已完成";
    }else{
      let ready=[];
      for(let i=0;i<okList.length;i++){
        ready[okList[i]]=1;
      }
      let flag=0;
      while(flag===0){
        if(ready[itemNum]==null){
          flag=1;
        }else{
          itemNum = Math.floor(Math.random()*engList.length);
          
        }
      }
    }
  }
  return {id:itemNum,content:engList[itemNum].EW_content,translation:engList[itemNum].EW_translation,type:engList[itemNum].EW_type};
}



module.exports = exports;