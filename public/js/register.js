'use strict';

let register = this.register ? (() => {throw new Error ();}) () : {};

$ (() => {

  register.register = () => {
    if ($ ('#ps').val () === $ ('#rps').val ()){
      $.post ('/api/rg', {
        account: $ ('#account').val (),
        ps: $ ('#ps').val (),
        nickname: $ ('#nickname').val (),
        tel: $ ('#tel').val (),
      }, (data, status) => {
        alert (data);
      });
    } else {
      alert ('密碼不符');
    }
    return false;
  };
});


 

