(function(){
  'use strict';

  var getVar, setCookie, mytduid;

  getVar = function(name){
    var nameIndex, space, getString = document.location.search, returnValue = '';

    do {
      var endOfValue, value;
      nameIndex = getString.indexOf(name + '=');

      if (nameIndex !== -1) {
        getString = getString.substr(nameIndex + name.length + 1, getString.length - nameIndex);
        endOfValue = getString.indexOf('&');

        if (endOfValue !== -1) {
          value = getString.substr(0, endOfValue);
        } else {
          value = getString;
        }

        if (returnValue === '' || value === '') {
          returnValue += value;
        } else {
          returnValue += ', ' + value;
        }
      }
    } while (nameIndex !== -1);

    space = returnValue.indexOf('+');

    while (space !== -1) {
      returnValue = returnValue.substr(0, space) + ' ' +
      returnValue.substr(space + 1, returnValue.length);
      space = returnValue.indexOf('+');
    }
    return(returnValue);
  };

  setCookie = function(name, value, expires, path, domain, secure){
    var expiresDate, today = new Date();
    today.setTime( today.getTime() );

    if ( expires ) {
      expires = expires * 1000 * 60 * 60 * 24;
    }

    expiresDate = new Date( today.getTime() + (expires) );

    document.cookie = name + '=' + encodeURI(value) +
      ((expires) ? '; expires=' + expiresDate.toGMTString() : "") +
      ((path) ? '; path=' + path : '') +
      ((domain) ? '; domain=' + domain : '') +
      ((secure) ? '; secure' : '');
  };

  mytduid = getVar('tduid');

  if  (mytduid !== '') {
    setCookie('TRADEDOUBLER', mytduid, 365);
  }

  if(typeof (TDConf) !== 'undefined') {
    TDConf.sudomain = ('https:' === document.location.protocol) ? 'swrap' : 'wrap';
    TDConf.host = '.tradedoubler.com/wrap';
    TDConf.containerTagURL = (('https:' === document.location.protocol) ? 'https://' : 'http://')  + TDConf.sudomain + TDConf.host;

    if (typeof (TDConf.Config) !== 'undefined') {
      var TDAsync = document.createElement('script');
      TDAsync.src = TDConf.containerTagURL  + '?id=' + TDConf.Config.containerTagId;
      TDAsync.async = 'yes';
      TDAsync.width = 0;
      TDAsync.height = 0;
      TDAsync.frameBorder = 0;
      document.body.appendChild(TDAsync);
    }
  }
}).call(this);
