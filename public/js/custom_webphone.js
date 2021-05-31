/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/assets/js/custom_webphone.js":
/*!************************************************!*\
  !*** ./Resources/assets/js/custom_webphone.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var extensionId = 0;
var currentAgentStatus = '';
var currStatusTimestamp = new Date();
var stop_flag = false;
var auxState = 0;
var aux_pending_flag = false;
var tid;
var loopFlag = true;
var holdKey = 'key';
var auxKey = 'key';
var reasonTranslation;
var CDRCallbackUrl = null;
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
  }
});
document.getElementById('icoming_call_layout').style.display = 'none';

window.setCDRCallbackUrl = function (url) {
  CDRCallbackUrl = url;
};

window.sendEvent = function (event) {
  try {
    catchEvent(event);
  } catch (err) {
    console.log(err.message);
  }
};

window.releaseExtension = function () {
  var formData = {
    campaign_id: jQuery('#campaignId').val()
  };
  $.ajax({
    type: 'POST',
    url: '/mizuvoip/relext',
    data: formData,
    dataType: 'json',
    error: function error(data) {
      console.log('ERR RelExt');
      console.log(data);
    }
  });
};

window.updateAgentStatus = function () {
  var agent_status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var connected_number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var nowDateTime = new Date();
  var formData = {
    campaign_id: jQuery('#campaignId').val(),
    extension_id: extensionId
  };

  if (agent_status != null) {
    formData.agent_status = agent_status;

    if (currentAgentStatus != agent_status) {
      currentAgentStatus = agent_status;
      currStatusTimestamp = new Date();
    }
  } else {
    formData.agent_status = currentAgentStatus;
  }

  formData.status_duration = Math.floor((nowDateTime.getTime() - currStatusTimestamp.getTime()) / 1000);

  if (connected_number != null) {
    formData.connected_number = connected_number;
  }

  $.ajax({
    type: 'POST',
    url: '/mizuvoip/updstat',
    data: formData,
    dataType: 'json',
    error: function error(data) {
      console.log('ERR UpdStat');
      console.log(data);
    }
  });

  if (loopFlag) {
    tid = setTimeout(updateAgentStatus, 5000);
  } else {
    clearTimeout(tid);
  }
};

webphone_api.parameters['autostart'] = 0;
webphone_api.onAppStateChange(function (appState) {
  if (appState === 'loaded') {
    sendEvent('App Loaded');
  } else if (appState === 'started') {
    sendEvent('App Started');
    updateAgentStatus('Ready', '');
    updateAuxState();
  } else if (appState === 'stopped') {
    releaseExtension();
    sendEvent('App Stopped');
    loopFlag = false;
    updateAgentStatus('App Stopped');
  }
});
webphone_api.onRegStateChange(function (regState) {
  if (regState === 'registered') {
    sendEvent('Ext Registered.');
    updateAgentStatus('Ready', '');
    updateAuxState();
  } else if (regState === 'unregistered') {
    sendEvent('Ext UnRegistered.');

    switch (parseInt(auxState)) {
      case 1:
        updateAgentStatus('Aux Konsultasi', '');
        break;

      case 2:
        updateAgentStatus('Aux Supporting', '');
        break;

      case 3:
        updateAgentStatus('Aux CatHSTR', '');
        break;

      case 4:
        updateAgentStatus('Aux Toilet', '');
        break;

      case 5:
        updateAgentStatus('Aux Air Minum', '');
        break;

      case 6:
        updateAgentStatus('Aux Sholat', '');
        break;

      case 7:
        updateAgentStatus('Aux Lunch', '');
        break;

      case 8:
        updateAgentStatus('Aux Briefing', '');
        break;

      case 9:
        updateAgentStatus('Aux Update System', '');
        break;
    }

    updateAuxState();
  } else if (regState === 'failed') {
    sendEvent('Ext Register failed.');
    updateAgentStatus('Ext Register failed', '');
  }
});

window.translateReason = function (reason) {
  var parameter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var reasonResult;

  if (reason in reasonTranslation.defined) {
    Object.entries(reasonTranslation.defined[reason]).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key_result = _ref2[0],
          value_result = _ref2[1];

      var tempBool = true;
      Object.values(value_result).forEach(function (value) {
        switch (value.operator) {
          case '<':
            if (parameter[value.field] >= value.value) {
              tempBool = false;
            }

            break;

          case '<=':
            if (parameter[value.field] > value.value) {
              tempBool = false;
            }

            break;

          case '=':
            if (parameter[value.field] != value.value) {
              tempBool = false;
            }

            break;

          case '>':
            if (parameter[value.field] <= value.value) {
              tempBool = false;
            }

            break;

          case '>=':
            if (parameter[value.field] < value.value) {
              tempBool = false;
            }

            break;

          default:
            break;
        }
      });

      if (tempBool) {
        reasonResult = key_result;
      }
    });
  } else if (!reasonTranslation.undefined.includes(reason)) {
    $.ajax({
      type: 'POST',
      url: '/mizuvoip/updateReason',
      data: {
        extension_id: extensionId,
        reason: reason
      },
      dataType: 'json',
      success: function success(data) {
        reasonTranslation = data;
      },
      error: function error(data) {
        console.log('ERR UpdReason');
        console.log(data);
      }
    });
  }

  return reasonResult;
};

webphone_api.onCdr(function (caller, called, connecttime, duration, direction, peerdisplayname, reason, line) {
  var param = new Array();
  param['duration'] = duration;
  param['direction'] = direction;
  param['line'] = line;
  param['connecttime'] = connecttime;

  if (CDRCallbackUrl != null) {
    //TODO module callback system
    $.ajax({
      type: 'POST',
      url: CDRCallbackUrl,
      data: {
        campaign_id: jQuery('#campaignId').val(),
        reason: translateReason(reason, param)
      },
      dataType: 'json',
      success: function success(data) {// console.log(data);
      },
      error: function error(data) {
        console.log('ERR CDRCallback');
        console.log(data);
      }
    });
  }

  $.ajax({
    type: 'POST',
    url: '/mizuvoip/handling',
    data: {
      campaign_id: jQuery('#campaignId').val(),
      duration: Math.floor((parseInt(duration, 10) + 500) / 1000)
    },
    dataType: 'json',
    error: function error(data) {
      console.log('ERR UpdHandling');
      console.log(data);
    }
  });
});

window.Start = function () {
  // Minta assignment user -> extension, dan setup koneksi softphone
  $.ajax({
    type: 'POST',
    url: '/mizuvoip/getext',
    data: {
      campaign_id: jQuery('#campaignId').val()
    },
    dataType: 'json',
    success: function success(data) {
      if (data != null) {
        webphone_api.setparameter('serveraddress', data.msg[0]['serveraddress']);
        webphone_api.setparameter('username', data.msg[0]['name']);
        webphone_api.setparameter('password', data.msg[0]['password']);
        extensionId = data.msg[0]['id'];
        sendEvent('Initializing');
        webphone_api.start();
        loopFlag = true;
        reasonTranslation = JSON.parse(data.msg[0]['reason']);
      } else {
        sendEvent('Ext None Available');
      }
    }
  });
};

window.Stop = function () {
  if (webphone_api.isincall()) {
    stop_flag = true;
  } else {
    webphone_api.stop();
  }
};

window.Call = function () {
  var destnr = document.getElementById('destnumber').value;

  if (typeof destnr === 'undefined' || destnr === null) {
    destnr = '';
  }

  document.getElementById('destnumber').disabled = true;
  webphone_api.setparameter('destination', destnr);
  webphone_api.call(destnr);
};

window.Hangup = function () {
  webphone_api.hangup();
  sendEvent('Ext Registered.');
};

window.Hold = function (holdState) {
  webphone_api.hold(holdState);
  var formData = {
    hold_val: holdState,
    campaign_id: jQuery('#campaignId').val(),
    key_val: holdKey
  };
  $.ajax({
    type: 'POST',
    url: '/mizuvoip/hold',
    data: formData,
    dataType: 'json',
    success: function success(data) {
      if (holdState) {
        holdKey = data.key;
      }
    },
    error: function error(data) {
      console.log('ERR Hold');
      console.log(data);
    }
  });

  if (holdState) //TODO sendevent hold and unhold
    {
      document.getElementById('btn_hold').innerText = 'un-Hold';

      document.getElementById("btn_hold").onclick = function () {
        Hold(false);
      };

      updateAgentStatus('Hold');
    } else {
    document.getElementById('btn_hold').innerText = 'Hold';

    document.getElementById("btn_hold").onclick = function () {
      Hold(true);
    };

    updateAgentStatus('Call Connected');
  }
};

window.updateAuxState = function () {
  var formData = {
    aux_val: auxState,
    campaign_id: jQuery('#campaignId').val(),
    key_val: auxKey
  };
  $.ajax({
    type: 'POST',
    url: '/mizuvoip/aux',
    data: formData,
    dataType: 'json',
    success: function success(data) {
      if (parseInt(auxState) != 0) {
        auxKey = data.key;
      } else {
        auxKey = 'key';
      }
    },
    error: function error(data) {
      console.log('ERR Aux');
      console.log(data);
    }
  });
};

window.Aux = function () //TODO standardize aux
{
  auxState = parseInt(document.getElementById("drp_aux").selectedIndex);

  if (parseInt(auxState) != 0) {
    if (webphone_api.isincall()) {
      aux_pending_flag = true;
    } else {
      for (var index = 1; index < 10; index++) {
        if (index != parseInt(auxState)) {
          document.getElementById('drp_aux_' + index).disabled = true;
        }
      }

      webphone_api.unregister();
    }
  } else {
    webphone_api.register();

    for (var _index = 1; _index < 10; _index++) {
      document.getElementById('drp_aux_' + _index).disabled = false;
    }
  }
};

window.Accept = function () {
  document.getElementById('icoming_call_layout').style.display = 'none';
  webphone_api.accept();
};

window.Reject = function () {
  document.getElementById('icoming_call_layout').style.display = 'none';
  webphone_api.reject();
};

webphone_api.onCallStateChange(function (event, direction, peername, peerdisplayname, line, callid) {
  sendEvent('Call ' + event);

  if (event === 'setup') {
    document.getElementById('btn_call').innerText = 'Hangup';

    document.getElementById("btn_call").onclick = function () {
      Hangup();
    };

    document.getElementById('btn_call').classList.add('btn-danger');
    document.getElementById('btn_call').classList.remove('btn-success');

    if (direction == 1) {// means it's outgoing call
    } else if (direction == 2) {
      // means it's icoming call
      document.getElementById('icoming_call_layout').style.display = 'block';
    }

    sendEvent('Call setup');
    updateAgentStatus('Call Setup');
  } //detecting the end of a call, even if it wasn't successfull
  else if (event === 'disconnected') {
      document.getElementById('btn_call').innerText = 'Call';

      document.getElementById("btn_call").onclick = function () {
        Call();
      };

      document.getElementById('btn_call').classList.add('btn-success');
      document.getElementById('btn_call').classList.remove('btn-danger');

      if (aux_pending_flag) {
        for (var index = 1; index < 10; index++) {
          if (index != parseInt(auxState)) {
            document.getElementById('drp_aux_' + index).disabled = true;
          }
        }

        webphone_api.unregister();
        aux_pending_flag = false;
      }

      if (stop_flag) {
        webphone_api.stop();
        stop_flag = false;
      }

      document.getElementById('icoming_call_layout').style.display = 'none';
      sendEvent('Call disconnected');
      updateAgentStatus('Call Disconnected');
      document.getElementById('destnumber').disabled = false;
    } else if (event === 'connected') {
      document.getElementById('destnumber').disabled = true;
      updateAgentStatus('Call Connected', document.getElementById('destnumber').value);
    }
});

window.GetTickCount = function () // returns the current time in milliseconds
{
  var currDate = new Date();
  return currDate.getTime();
};

/***/ }),

/***/ 1:
/*!******************************************************!*\
  !*** multi ./Resources/assets/js/custom_webphone.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Dev\boilerplate\Modules\MizuVOIP\Resources\assets\js\custom_webphone.js */"./Resources/assets/js/custom_webphone.js");


/***/ })

/******/ });