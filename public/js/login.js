'use strict';

let login = this.login ? (() => {throw new Error ();}) () : {};

$ (() => {
  login.login = () => {
    $.post ('/api/login',
      { account: $ ('#account').val (),
        ps: $ ('#ps').val () },
      (data, status) => {
        alert (data);
      });
    return false;
  };
});