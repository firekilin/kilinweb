"use strict";

var getdata = this.getdata?(()=>{throw new Error()})():{};

$(()=>{
  getdata.okList=[];
  getdata.type=["名詞","動詞","形容詞","副詞","代名詞","介系詞","連接詞","感嘆詞"]
  getdata.speakItem="null";
  getdata.speak=()=>{
    getdata.say(getdata.speakItem);
  }
  getdata.say=(m)=> {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[1];
    console.log(voices);
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = m;
    msg.lang = 'en-*';
    speechSynthesis.speak(msg);
  }
  getdata.enItemchange = () =>{
    $.post("../api/getEnglish", 
    {
       okList:JSON.stringify(getdata.okList)
    }, (data,status)=>{
      if(data=="已完成"){
        alert("已完成一輪");
        $("#changee").text("重新開始");
        getdata.okList=[];
      }else{
        $("#changee").text("更換");
        getdata.okList.push(data.id);
      }
      $("#enItemContent").text(data.content);
      getdata.speakItem=data.content;
      getdata.say(data.content);
      $("#enItemAnser").text("解釋："+data.translation);
      $("#enItemType").text("詞性："+getdata.type[data.type]);
    }
  )
  }
  getdata.enItemchange();
  
});
