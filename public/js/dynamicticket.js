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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/assets/js/app.js":
/*!************************************!*\
  !*** ./Resources/assets/js/app.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var obj = {
  input: []
};
var dataContent = new Array();

window.recursiveSortable = function () {
  document.getElementById('sortable').innerHTML = "";
  var objContainer = obj.input;

  if (objContainer != null) {
    for (var i = 0; i < objContainer.length; i++) {
      // parseSortable(objContainer[i],i,log,targetId);
      parseSortable(objContainer[i], i);
    }
  }
};

window.parseSortable = function (item, index) {
  var log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var targetId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var newDivListItem;
  newDivListItem = document.createElement('div');
  newDivListItem.setAttribute('class', 'list-item');
  newDivListItem.setAttribute('data-id', index);
  newDivListItem.setAttribute('data-item-sortable-id', 0);
  newDivListItem.setAttribute('draggable', true);
  newDivListItem.setAttribute('role', 'option');
  newDivListItem.setAttribute('aria-grabbed', false);
  newDivListItem.innerHTML = '<div class="flex">' + item.name + '</div><div class="no-wrap"><div class="text-muted d-none d-md-block">' + item.type + '</div></div><div><div class="item-action dropdown"><a href="#" data-toggle="dropdown" class="text-muted" data-abc="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></a><div class="dropdown-menu dropdown-menu-right bg-black" role="menu"><a class="dropdown-item edit" data-abc="true" onclick="editComponent(' + index + ')">Edit</a><div class="dropdown-divider"></div><a class="dropdown-item trash" data-abc="true" onclick="deleteComponent(' + index + ')">Delete item</a></div></div></div>';
  document.getElementById('sortable').appendChild(newDivListItem);
};

window.addComponent = function () {
  var componentName = document.getElementById('componentName').value;
  var componentType = document.getElementById('componentType').value;
  var objContainer = obj.input;
  objContainer.push({
    name: componentName,
    type: componentType
  });
  $.when(saveInput()).done(function (saveInput) {
    if (saveInput > 0) {
      recursiveSortable();
      recursiveInput();
    } else {
      alert('Add Component Fail'); //TODO yg sudah di push di objContainer harus di POP
    }
  });
};

window.deleteComponent = function (index) {//TODO action delete component
};

window.editComponent = function (index) {
  var objComponent = obj.input[index];
  document.getElementById('componentName').value = objComponent.name;
  document.getElementById('componentType').value = objComponent.type;

  if ('label' in objComponent) {
    document.getElementById('componentLabel').value = objComponent.label;
  }

  document.getElementById('componentLabel').disabled = false; // if ('class' in objComponent) {document.getElementById('componentClass').value = objComponent.class;}

  if ('placeholder' in objComponent) {
    document.getElementById('componentPlaceholder').value = objComponent.placeholder;
  }

  document.getElementById('componentPlaceholder').disabled = false;
  document.getElementById('myButton').innerHTML = 'Save';

  document.getElementById("myButton").onclick = function () {
    updateComponent(index);
  };

  document.getElementById('myButton').classList.add('btn-success');
  document.getElementById('myButton').classList.remove('btn-primary');
  sortableDisable();
};

window.updateComponent = function (index) {
  var objComponent = obj.input[index];
  objComponent.name = document.getElementById('componentName').value;
  objComponent.type = document.getElementById('componentType').value;

  if (document.getElementById('componentLabel').value != '') {
    objComponent.label = document.getElementById('componentLabel').value;
  } // if ('class' in objComponent) {document.getElementById('componentClass').value = objComponent.class;}


  if (document.getElementById('componentPlaceholder').value != '') {
    objComponent.placeholder = document.getElementById('componentPlaceholder').value;
  }

  $.when(saveInput()).done(function (saveInput) {
    if (saveInput > 0) {
      recursiveSortable();
      recursiveInput();
    } else {
      alert('Save Component Fail'); //TODO Old value harus di restore
    }
  });
  resetComponentInput();
};

window.resetComponentInput = function () {
  document.getElementById('componentName').value = '';
  document.getElementById('componentType').value = 'text';
  document.getElementById('componentLabel').value = '';
  document.getElementById('componentLabel').disabled = true;
  document.getElementById('componentClass').select2("val", "");
  document.getElementById('componentClass').disabled = true;
  document.getElementById('componentPlaceholder').value = '';
  document.getElementById('componentPlaceholder').disabled = true;
  document.getElementById('myButton').innerHTML = 'Add';

  document.getElementById("myButton").onclick = function () {
    addComponent();
  };

  document.getElementById('myButton').classList.add('btn-primary');
  document.getElementById('myButton').classList.remove('btn-success');
  sortableEnable();
};

window.saveInput = function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
    }
  });
  var formData = {
    input_field: JSON.stringify(obj),
    id: $("#categorySelection").select2("val")
  };
  return $.ajax({
    type: 'POST',
    url: '/dynamicticket/saveinput',
    data: formData,
    dataType: 'json'
  });
};

window.sortableEnable = function () {
  $("#sortable").sortable({
    start: function start(e, ui) {
      // creates a temporary attribute on the element with the old index
      $(this).attr('data-previndex', ui.item.index());
    },
    update: function update(e, ui) {
      // gets the new and old index then removes the temporary attribute
      var newIndex = ui.item.index();
      var oldIndex = $(this).attr('data-previndex');
      $(this).removeAttr('data-previndex');
      insertAndShift(oldIndex, newIndex);
    }
  });
  $("#sortable").sortable("option", "disabled", false); // ^^^ this is required otherwise re-enabling sortable will not work!

  $("#sortable").disableSelection();
  return false;
};

window.sortableDisable = function () {
  $("#sortable").sortable("disable");
  return false;
};

window.insertAndShift = function (from, to) {
  var cutOut = obj.input.splice(from, 1)[0]; // cut the element at index 'from'

  obj.input.splice(to, 0, cutOut); // insert it at index 'to'

  recursiveInput();
};

window.getInputParameters = function () {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
    }
  });
  var formData = {
    category_id: document.getElementById('categorySelection').value
  };
  $.ajax({
    type: 'POST',
    url: '/dynamicticket/getinput',
    data: formData,
    dataType: 'json',
    success: function success(data) {
      obj = data;
      dataContent = new Array();
      recursiveInput();

      if (mode == "designer") {
        recursiveSortable();
      }
    },
    error: function error(data) {
      console.log(data);
    }
  });
};

window.parseInput = function (item, index, log, targetId) {
  var newDiv, newDivCol, newDivRow, newLabel, newInput;

  switch (item.type) {
    case 'email':
    case 'password':
    case 'text':
      newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'form-group row');
      newLabel = document.createElement('label');
      newLabel.setAttribute('for', item.name);
      newLabel.setAttribute('class', 'col-sm-2 col-form-label');

      if (typeof item.label != 'undefined') {
        newLabel.innerHTML = item.label;
      } else {
        newLabel.innerHTML = item.name;
      }

      newDiv.appendChild(newLabel);
      newDivCol = document.createElement('div');
      newDiv.appendChild(newDivCol);
      newInput = document.createElement('input');
      newInput.setAttribute("id", item.name);
      newInput.type = item.type;

      if (typeof item["class"] != 'undefined') {
        newDivCol.setAttribute('class', item["class"]);
        newInput.setAttribute('class', 'col');
      } else {
        newDivCol.setAttribute('class', 'col-sm-10');
      }

      newDivCol.appendChild(newInput);
      document.getElementById(targetId).appendChild(newDiv);
      dataContent.push(item.name);
      break;

    case 'checkbox':
    case 'radio':
      var newFieldset = document.createElement('fieldset');
      newFieldset.setAttribute('class', 'form-group');
      newDivRow = document.createElement('div');
      newDivRow.setAttribute('class', 'row');
      newFieldset.appendChild(newDivRow);
      var newLegend = document.createElement('label');
      newLegend.setAttribute('class', 'col-sm-2 col-form-label pt-0');

      if (typeof item.label != 'undefined') {
        newLegend.innerHTML = item.label;
      } else {
        newLegend.innerHTML = item.name;
      }

      newDivRow.appendChild(newLegend);
      newDivCol = document.createElement('div');

      if (typeof item["class"] != 'undefined') {
        newDivCol.setAttribute('class', item["class"]);
      } else {
        newDivCol.setAttribute('class', 'col-sm-10');
      }

      newDivRow.appendChild(newDivCol);

      for (var i = 0; i < item.option.length; i++) {
        newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'form-check');
        newDivCol.appendChild(newDiv);
        newInput = document.createElement('input');
        newInput.setAttribute('class', 'form-check-input');
        newInput.type = item.type;
        newInput.setAttribute('id', item.name + i);
        dataContent.push(item.name + i);
        newInput.setAttribute('value', item.option[i].value);
        newInput.setAttribute('name', item.name);
        newDiv.appendChild(newInput);
        newLabel = document.createElement('label');
        newLabel.setAttribute('class', 'form-check-label');
        newLabel.setAttribute('for', item.name + i);
        newLabel.innerHTML = item.option[i].text;
        newDiv.appendChild(newLabel);
      }

      document.getElementById(targetId).appendChild(newFieldset);
      break;

    case 'textarea':
      newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'form-group');
      newDivRow = document.createElement('div');
      newDivRow.setAttribute('class', 'row');
      newDiv.appendChild(newDivRow);
      newLabel = document.createElement('label');
      newLabel.setAttribute('class', 'col-sm-2 col-form-label');
      newLabel.setAttribute('for', item.name);

      if (typeof item.label != 'undefined') {
        newLabel.innerHTML = item.label;
      } else {
        newLabel.innerHTML = item.name;
      }

      newDivRow.appendChild(newLabel);
      newDivCol = document.createElement('div');

      if (typeof item["class"] != 'undefined') {
        newDivCol.setAttribute('class', item["class"]);
      } else {
        newDivCol.setAttribute('class', 'col-sm-10');
      }

      newDivRow.appendChild(newDivCol);
      var newTextArea = document.createElement('textarea');
      newTextArea.setAttribute('class', 'form-control');
      newTextArea.setAttribute('id', item.name);

      if (typeof item.rows != 'undefined') {
        newLabel.setAttribute('rows', item.rows);
      } else {
        newLabel.setAttribute('rows', 3);
      }

      newDivCol.appendChild(newTextArea);
      document.getElementById(targetId).appendChild(newDiv);
      dataContent.push(item.name);
      break;

    case 'select':
      newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'form-group');
      newDivRow = document.createElement('div');
      newDivRow.setAttribute('class', 'row');
      newDiv.appendChild(newDivRow);
      newLabel = document.createElement('label');
      newLabel.setAttribute('class', 'col-sm-2 col-form-label');
      newLabel.setAttribute('for', item.name);

      if (typeof item.label != 'undefined') {
        newLabel.innerHTML = item.label;
      } else {
        newLabel.innerHTML = item.name;
      }

      newDivRow.appendChild(newLabel);
      newDivCol = document.createElement('div');

      if (typeof item["class"] != 'undefined') {
        newDivCol.setAttribute('class', item["class"]);
      } else {
        newDivCol.setAttribute('class', 'col-sm-10');
      }

      newDivRow.appendChild(newDivCol);
      var newSelect = document.createElement('select');
      newSelect.setAttribute('id', item.name);
      newSelect.setAttribute('name', item.name);
      newSelect.setAttribute('class', 'form-control select2');
      newSelect.setAttribute('onchange', 'recursiveInput("' + log + index + '#")');
      newDivCol.appendChild(newSelect);

      for (var _i = 0; _i < item.option.length; _i++) {
        var newOption = document.createElement('option');
        newOption.setAttribute('value', item.option[_i].value);
        newOption.innerHTML = item.option[_i].text;
        newSelect.appendChild(newOption);
      }

      document.getElementById(targetId).appendChild(newDiv);
      dataContent.push(item.name);
      var newDivResponse = document.createElement('div');
      newDivResponse.setAttribute('id', item.name + 'Response');
      document.getElementById(targetId).appendChild(newDivResponse);
      break;

    default:
      break;
  }
};

window.recursiveInput = function () {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var objContainer = obj.input;
  var log = '';
  var targetId = dynamicTicketTargetId;

  if (index != null) {
    log = index;
    var pointer = index.split('#');

    for (var i = 0; i < pointer.length - 1; i++) {
      targetId = objContainer[pointer[i]].name;
      objContainer = objContainer[pointer[i]].option;
      var selectedIndex = 0;

      for (var j = 0; j < objContainer.length; j++) {
        if (objContainer[j].value === document.getElementById(targetId).value) {
          selectedIndex = j;
        }
      }

      targetId = targetId + 'Response';
      document.getElementById(targetId).innerHTML = '';

      if (typeof objContainer[selectedIndex].response != 'undefined') {
        objContainer = objContainer[selectedIndex].response;
      } else {
        objContainer = null;
      }
    }
  } else {
    document.getElementById(targetId).innerHTML = '';
  }

  if (objContainer != null) {
    for (var _i2 = 0; _i2 < objContainer.length; _i2++) {
      parseInput(objContainer[_i2], _i2, log, targetId);
    }
  }
};

window.submit = function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
    }
  });
  var jsonData = {};

  for (var i = 0; i < dataContent.length; i++) {
    var idExist = document.getElementById(dataContent[i]);

    if (idExist) {
      switch (idExist.type) {
        case 'checkbox':
        case 'radio':
          jsonData[idExist.value] = true;
          break;

        default:
          jsonData[dataContent[i]] = idExist.value;
          break;
      }
    }
  }

  var formData = {
    json_data: JSON.stringify(jsonData),
    category_id: document.getElementById('categorySelection').value
  }; // console.log(formData);

  $.ajax({
    type: 'POST',
    url: '/dynamicticket/submit',
    data: formData,
    dataType: 'json',
    success: function success(data) {
      dataContent = new Array();
      recursiveInput(); // console.log(data);
    },
    error: function error(data) {
      console.log(data);
    }
  });
};

/***/ }),

/***/ "./Resources/assets/sass/app.scss":
/*!****************************************!*\
  !*** ./Resources/assets/sass/app.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./Resources/assets/js/app.js ./Resources/assets/sass/app.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Dev\boilerplate\Modules\DynamicTicket\Resources\assets\js\app.js */"./Resources/assets/js/app.js");
module.exports = __webpack_require__(/*! C:\Dev\boilerplate\Modules\DynamicTicket\Resources\assets\sass\app.scss */"./Resources/assets/sass/app.scss");


/***/ })

/******/ });