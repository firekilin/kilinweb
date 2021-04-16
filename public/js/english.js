'use strict';

var getdata = this.getdata ? (() => {throw new Error ();}) () : {};

$ (() => {
  getdata.type = ['名詞', '動詞', '形容詞', '副詞', '代名詞', '介系詞', '連接詞', '感嘆詞'];
  //設定語音
  getdata.say = (m, a) => {
    var msg = new SpeechSynthesisUtterance ();
    var voices = window.speechSynthesis.getVoices ();
    let voicc;
    for (let i = 0;i < voices.length;i ++){
      if (voices[i].voiceURI == 'Samantha'){
        voicc = voices[i];
        break;
      } else if (voices[i].lang == 'en-US'){
        voicc = voices[i];
      }
    }
    msg.voice = voicc;
    msg.voiceURI = 'native';
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = m;
    msg.lang = 'en-*';
    speechSynthesis.speak (msg);
  };

  getdata.random = (data) => {
    let random = [];
    let ready = [];
    for (let i = 0;i < data.length;i ++){
      let itemNum = Math.floor (Math.random () * (data.length));
      let flag = 0;
      while (flag == 0){
        if (ready[itemNum] == null){
          random.push (itemNum);
          ready[itemNum] = 1;
          flag = 1;
        } else {
          itemNum = Math.floor (Math.random () * (data.length));
        }
      }
    }
    return random;
  };

  getdata.show = (data) => {
    $ (`.toggle${data}`).toggle ();
    getdata.say ($ ('.EW_content')[data].innerHTML, 34);

  };
 
  //設定下拉清單
  $.post ('/api/getEnglishList', {}, (data, status) => {
    getdata.setList = data;
    $ ('#selectEnglish').kendoDropDownList ({ //設定報價下拉列
      dataTextField: 'text',
      dataValueField: 'value',
      dataSource: getdata.setList,
      select: (e) => {
  
        $.post ('/api/getEnglish', { id: e.dataItem.value }, (data, status) => {
          let random = getdata.random (data);
          for (let i = 0;i < data.length;i ++){
            if ($ ('.EW_id')[i] != null){
              $ ('.EW_id')[i].innerHTML = data[random[i]].id;
              $ ('.EW_content')[i].innerHTML = data[random[i]].content;
              $ ('.EW_translation')[i].innerHTML = `<div class="toggle${i}">${data[random[i]].translation}</div>` ;
              $ ('.EW_type')[i].innerHTML = getdata.type[data[random[i]].type];
              $ ('.EW_level')[i].innerHTML = `<input id='${data[random[i]].id}' style="width:150px" name="selectLevel">`;
              $ ('.show')[i].innerHTML = `<button class="btn btn-outline-light" onclick='getdata.show(${i})'>顯示</button>`;
              $ ('.search')[i].innerHTML = `<a target="_blank" class="btn btn-outline-light" href="https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/${data[random[i]].content}">線上翻譯</a>`;
            } else {
              $ ('#engtable').append (`<tr>
              <th class="EW_id" scope="row">${data[random[i]].id}</th>
              <td class="EW_content">${data[random[i]].content}</td>
              <td class="EW_translation"><div class="toggle${i}">${data[random[i]].translation}</div></td>
              <td class="EW_type">${getdata.type[data[random[i]].type]}</td>
              <td class="EW_level"><input id='${data[random[i]].id}' style="width:150px" name="selectLevel"></td>
              <td class="show"><button class="btn btn-outline-light" onclick='getdata.show(${i})'>顯示</button></td>
              <td class="search"><a target="_blank" class="btn btn-outline-light"  href="https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/${data[random[i]].content}">線上翻譯</a></td>
            </tr>`);
            }
            $ (`.toggle${i}`).toggle ();
          }
          $ ('input[name=\'selectLevel\']').kendoDropDownList ({
            dataTextField: 'text',
            dataValueField: 'value',
            autoWidth: true,
            dataSource: [{ text: '未設定', value: '0' }, { text: '易', value: '1' }, { text: '中', value: '2' }, { text: '難', value: '3' }],    
            change: (e) => {
              $.post ('/api/setEnglishLevel', { id: e.sender.element[0].id,
                level: e.sender.value () }, (data, status) => {
              });
        
            }
          }).data ('kendoDropDownList');
          for (let i = 0;i < data.length;i ++){
            $ (`input[name='selectLevel']:nth(${i})`).data ('kendoDropDownList').select (data[random[i]].level);
          }
        });
      }
 

    }).data ('kendoDropDownList');

  });



  
});
