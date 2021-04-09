'use strict';

var getdata = this.getdata ? (() => {throw new Error ();}) () : {};

$ (() => {
  getdata.type = ['名詞', '動詞', '形容詞', '副詞', '代名詞', '介系詞', '連接詞', '感嘆詞'];
  getdata.speakItem = 'null';
  //設定語音
  getdata.speak = () => {
    getdata.say (getdata.speakItem);
  };
  //設定語音
  getdata.say = (m) => {
    var msg = new SpeechSynthesisUtterance ();
    var voices = window.speechSynthesis.getVoices ();
    msg.voice = voices[1];
    console.log (voices);
    msg.voiceURI = 'native';
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = m;
    msg.lang = 'en-*';
    speechSynthesis.speak (msg);
  };

  //設定下拉清單
  $.post ('/api/getEnglishList', {}, (data, status) => {
    getdata.setList = data;
    $ ('#selectEnglish').kendoDropDownList ({ //設定報價下拉列
      dataTextField: 'text',
      dataValueField: 'value',
      dataSource: getdata.setList,
      select: function(e) {
  
        $.post ('/api/getEnglish', { id: e.dataItem.value }, (data, status) => {

        });
      }
 

    }).data ('kendoDropDownList');

  });



  
});
