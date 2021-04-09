const db = require ('./getDB');
const query = db.query;


exports.getEnglish = async(req, res) => {
  let list = req.body.id;
  let engList = [];
  let engItem = await query (`SELECT * FROM kilinweb.english_word where EL_id='${list}';`);
  for (let i = 0;i < engItem.length;i ++){
    engList.push ({
      id: i, content: engItem[i].EW_content, translation: engItem[i].EW_translation, type: engItem[i].EW_type
    });
  }
  return engList;
};

exports.getEnglishList = async(req, res) => {
  let engList = [];
  let engItem = await query (`SELECT * FROM kilinweb.english_list;`);
  for (let i = 0;i < engItem.length;i ++){
    engList.push ({ value: engItem[i].EL_id, text: engItem[i].EL_name });
  }
  return engList;
};


module.exports = exports;