(function($)
{
	var docCookies = {
	  getItem: function (sKey) {
	    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "$&") + "s*=s*([^;]*).*$)|^.*$"), "$1")) || null;
	  },
	  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) { return false; }
	    var sExpires = "";
	    if (vEnd) {
	      switch (vEnd.constructor) {
	        case Number:
	        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	        break;
	        case String:
	        sExpires = "; expires=" + vEnd;
	        break;
	        case Date:
	        sExpires = "; expires=" + vEnd.toUTCString();
	        break;
	      }
	    }
	    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	    return true;
	  },
	  removeItem: function (sKey, sPath, sDomain) {
	    if (!sKey || !this.hasItem(sKey)) { return false; }
	    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
	    return true;
	  },
	  hasItem: function (sKey) {
	    return (new RegExp("(?:^|;s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "$&") + "s*=")).test(document.cookie);
	  },
	  keys: /* optional method: you can safely remove it! */ function () {
	    var aKeys = document.cookie.replace(/((?:^|s*;)[^=]+)(?=;|$)|^s*|s*(?:=[^;]*)?(?:1|$)/g, "").split(/s*(?:=[^;]*)?;s*/);
	    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
	      return aKeys;
	  }
	};

	var set_point = parseInt(docCookies.getItem("set_point"));
	var current_point = parseInt($('.right').find('.number').html().replace(",", ""));

	if (current_point > set_point || docCookies.hasItem("set_point") == false || set_point == null)
	{
		var _set_point = prompt("목표로 할 점수를 입력해주세요");
		docCookies.setItem("set_point", _set_point);
	}

	if (current_point < parseInt(docCookies.getItem("set_point")))
		$('.course-actions').find('a')[4].click();
			
})(jQuery);