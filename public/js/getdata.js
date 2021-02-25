"use strict";

var getdata = this.getdata?(()=>{throw new Error()})():{};

$(()=>{

  getdata.data = "20";

  $.post("../api/getdata", 
    {
       firstdata:'first',seconddata:"second"
    }, (data,status)=>{
       console.log(data);
    }
  )

});
console.log(getdata.data);
