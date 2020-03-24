(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(name) {
  _classCallCheck(this, Task);

  this.id = new Date().getTime();
  this.name = name;
  this.isComplete = false;
  return this;
};

exports.default = Task;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

var _Task = require('./Task');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoList = function () {
  function ToDoList(key) {
    _classCallCheck(this, ToDoList);

    this.key = key;

    if (!_helpers.ls.getItem(key)) _helpers.ls.setItem(key, _helpers.j.stringify([]));

    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  _createClass(ToDoList, [{
    key: 'addTask',
    value: function addTask(e) {
      //c(e)
      if (!e.target.value) alert('No puedes agregar una tarea vacia');

      if (e.keyCode === _helpers.ENTER_KEY) {
        var newTask = new _Task2.default(e.target.value),
            tasks = _helpers.j.parse(_helpers.ls.getItem(this.key));

        tasks.push(newTask);
        _helpers.ls.setItem(this.key, _helpers.j.stringify(tasks));
        this.renderTask(newTask);
        e.target.value = null;
        //c(newTask, tasks, ls)
      }
    }
  }, {
    key: 'editTask',
    value: function editTask(e) {
      var _this = this;

      if (e.target.localName === 'label') {
        //alert('funciona')
        var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)),
            toEdit = tasks.findIndex(function (task) {
          return task.name === e.target.textContent;
        }),
            label = _helpers.d.querySelector('[data-id="' + tasks[toEdit].id + '"]');
        //c(tasks, toEdit, tasks[toEdit])

        var saveTask = function saveTask(e) {
          e.target.textContent = e.target.textContent;
          tasks[toEdit].name = e.target.textContent;
          _helpers.ls.setItem(_this.key, _helpers.j.stringify(tasks));
          e.target.blur();
        };

        label.addEventListener('blur', function (e) {
          return saveTask(e);
        });
        label.addEventListener('keyup', function (e) {
          return e.keyCode === _helpers.ENTER_KEY && saveTask(e);
        });
      }
    }
  }, {
    key: 'removeTask',
    value: function removeTask(e) {
      (0, _helpers.c)(e);
      if (e.target.localName === 'a') {
        //alert('eliminar')
        var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)),
            toRemove = tasks.findIndex(function (task) {
          return task.id.toString() === e.target.dataset.id;
        });
        //c(tasks, toRemove)

        tasks.splice(toRemove, 1);
        _helpers.ls.setItem(this.key, _helpers.j.stringify(tasks));
        e.target.parentElement.remove();
      }
    }
  }, {
    key: 'renderTask',
    value: function renderTask(task) {
      var templateTask = '\n      <li class="List-item ' + (task.isComplete ? 'complete' : '') + '">\n        <input id="' + task.id + '" type="checkbox" class="List-checkbox" ' + (task.isComplete ? 'checked' : '') + '>\n        <label data-id="' + task.id + '" class="List-label" contenteditable  spellcheck>' + task.name + '</label>\n        <a href="#" data-id="' + task.id + '" class="List-removeLink">&#128465;</a>\n      </li>\n    ';
      list.insertAdjacentHTML('beforeend', templateTask);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)),
          listTasks = list.children;
      //c(tasks, listTasks)

      tasks.forEach(function (task) {
        return _this2.renderTask(task);
      });

      Array.from(listTasks).forEach(function (input) {
        input.querySelector('input[type="checkbox"]').addEventListener('change', function (e) {
          var task = tasks.filter(function (task) {
            return task.id == e.target.id;
          });
          //c(task)

          if (e.target.checked) {
            e.target.parentElement.classList.add('complete');
            task[0].isComplete = true;
          } else {
            e.target.parentElement.classList.remove('complete');
            task[0].isComplete = false;
          }

          _helpers.ls.setItem(_this2.key, _helpers.j.stringify(tasks));
        });
      });

      task.addEventListener('keyup', this.addTask);
      list.addEventListener('click', this.editTask);
      list.addEventListener('click', this.removeTask);
    }
  }]);

  return ToDoList;
}();

exports.default = ToDoList;

},{"./Task":1,"./helpers":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ENTER_KEY = 13,
    c = console.log,
    d = document,
    j = JSON,
    ls = localStorage;

exports.ENTER_KEY = ENTER_KEY;
exports.c = c;
exports.d = d;
exports.j = j;
exports.ls = ls;

},{}],4:[function(require,module,exports){
'use strict';

var _helpers = require('./helpers');

var _ToDoList = require('./ToDoList');

var _ToDoList2 = _interopRequireDefault(_ToDoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var task = _helpers.d.querySelector('#task'),
    list = _helpers.d.querySelector('#list'),
    todo = new _ToDoList2.default('edList');

todo.render();

},{"./ToDoList":2,"./helpers":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxUYXNrLmpzIiwic3JjXFxqc1xcVG9Eb0xpc3QuanMiLCJzcmNcXGpzXFxoZWxwZXJzLmpzIiwic3JjXFxqc1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztJQ0FxQixJLEdBQ25CLGNBQWEsSUFBYixFQUFtQjtBQUFBOztBQUNqQixPQUFLLEVBQUwsR0FBVSxJQUFJLElBQUosR0FBVyxPQUFYLEVBQVY7QUFDQSxPQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsT0FBSyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQzs7a0JBTmtCLEk7Ozs7Ozs7Ozs7O0FDQXJCOztBQUNBOzs7Ozs7OztJQUVxQixRO0FBQ25CLG9CQUFhLEdBQWIsRUFBa0I7QUFBQTs7QUFDaEIsU0FBSyxHQUFMLEdBQVcsR0FBWDs7QUFFQSxRQUFLLENBQUMsWUFBRyxPQUFILENBQVcsR0FBWCxDQUFOLEVBQ0UsWUFBRyxPQUFILENBQVksR0FBWixFQUFpQixXQUFFLFNBQUYsQ0FBWSxFQUFaLENBQWpCOztBQUVGLFNBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBZjtBQUNBLFNBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5CLENBQWhCO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixJQUFyQixDQUFsQjtBQUNEOzs7OzRCQUVRLEMsRUFBRztBQUNWO0FBQ0EsVUFBSyxDQUFDLEVBQUUsTUFBRixDQUFTLEtBQWYsRUFDRSxNQUFNLG1DQUFOOztBQUVGLFVBQUssRUFBRSxPQUFGLHVCQUFMLEVBQStCO0FBQzdCLFlBQUksVUFBVSxtQkFBVSxFQUFFLE1BQUYsQ0FBUyxLQUFuQixDQUFkO0FBQUEsWUFDRSxRQUFRLFdBQUUsS0FBRixDQUFTLFlBQUcsT0FBSCxDQUFXLEtBQUssR0FBaEIsQ0FBVCxDQURWOztBQUdBLGNBQU0sSUFBTixDQUFZLE9BQVo7QUFDQSxvQkFBRyxPQUFILENBQVksS0FBSyxHQUFqQixFQUFzQixXQUFFLFNBQUYsQ0FBWSxLQUFaLENBQXRCO0FBQ0EsYUFBSyxVQUFMLENBQWlCLE9BQWpCO0FBQ0EsVUFBRSxNQUFGLENBQVMsS0FBVCxHQUFpQixJQUFqQjtBQUNBO0FBQ0Q7QUFDRjs7OzZCQUVTLEMsRUFBRztBQUFBOztBQUNYLFVBQUssRUFBRSxNQUFGLENBQVMsU0FBVCxLQUF1QixPQUE1QixFQUFzQztBQUNwQztBQUNBLFlBQUksUUFBUSxXQUFFLEtBQUYsQ0FBUyxZQUFHLE9BQUgsQ0FBVyxLQUFLLEdBQWhCLENBQVQsQ0FBWjtBQUFBLFlBQ0UsU0FBVSxNQUFNLFNBQU4sQ0FBaUI7QUFBQSxpQkFBUSxLQUFLLElBQUwsS0FBYyxFQUFFLE1BQUYsQ0FBUyxXQUEvQjtBQUFBLFNBQWpCLENBRFo7QUFBQSxZQUVFLFFBQVEsV0FBRSxhQUFGLGdCQUE2QixNQUFNLE1BQU4sRUFBYyxFQUEzQyxRQUZWO0FBR0E7O0FBRUEsWUFBTSxXQUFXLFNBQVgsUUFBVyxJQUFLO0FBQ3BCLFlBQUUsTUFBRixDQUFTLFdBQVQsR0FBdUIsRUFBRSxNQUFGLENBQVMsV0FBaEM7QUFDQSxnQkFBTSxNQUFOLEVBQWMsSUFBZCxHQUFxQixFQUFFLE1BQUYsQ0FBUyxXQUE5QjtBQUNBLHNCQUFHLE9BQUgsQ0FBWSxNQUFLLEdBQWpCLEVBQXNCLFdBQUUsU0FBRixDQUFZLEtBQVosQ0FBdEI7QUFDQSxZQUFFLE1BQUYsQ0FBUyxJQUFUO0FBQ0QsU0FMRDs7QUFPQSxjQUFNLGdCQUFOLENBQXdCLE1BQXhCLEVBQWdDO0FBQUEsaUJBQUssU0FBUyxDQUFULENBQUw7QUFBQSxTQUFoQztBQUNBLGNBQU0sZ0JBQU4sQ0FBd0IsT0FBeEIsRUFBaUM7QUFBQSxpQkFBTyxFQUFFLE9BQUYsdUJBQUYsSUFBK0IsU0FBUyxDQUFULENBQXBDO0FBQUEsU0FBakM7QUFDRDtBQUNGOzs7K0JBRVcsQyxFQUFHO0FBQ2Isc0JBQUUsQ0FBRjtBQUNBLFVBQUssRUFBRSxNQUFGLENBQVMsU0FBVCxLQUF1QixHQUE1QixFQUFrQztBQUNoQztBQUNBLFlBQUksUUFBUSxXQUFFLEtBQUYsQ0FBUyxZQUFHLE9BQUgsQ0FBVyxLQUFLLEdBQWhCLENBQVQsQ0FBWjtBQUFBLFlBQ0UsV0FBWSxNQUFNLFNBQU4sQ0FBaUI7QUFBQSxpQkFBUSxLQUFLLEVBQUwsQ0FBUSxRQUFSLE9BQXVCLEVBQUUsTUFBRixDQUFTLE9BQVQsQ0FBaUIsRUFBaEQ7QUFBQSxTQUFqQixDQURkO0FBRUE7O0FBRUEsY0FBTSxNQUFOLENBQWEsUUFBYixFQUF1QixDQUF2QjtBQUNBLG9CQUFHLE9BQUgsQ0FBWSxLQUFLLEdBQWpCLEVBQXNCLFdBQUUsU0FBRixDQUFZLEtBQVosQ0FBdEI7QUFDQSxVQUFFLE1BQUYsQ0FBUyxhQUFULENBQXVCLE1BQXZCO0FBQ0Q7QUFDRjs7OytCQUVXLEksRUFBTTtBQUNoQixVQUFJLGtEQUNxQixLQUFLLFVBQUwsR0FBa0IsVUFBbEIsR0FBK0IsRUFEcEQsZ0NBRWEsS0FBSyxFQUZsQixpREFFK0QsS0FBSyxVQUFMLEdBQWtCLFNBQWxCLEdBQThCLEVBRjdGLG9DQUdrQixLQUFLLEVBSHZCLHlEQUc2RSxLQUFLLElBSGxGLCtDQUl1QixLQUFLLEVBSjVCLCtEQUFKO0FBT0EsV0FBSyxrQkFBTCxDQUF3QixXQUF4QixFQUFxQyxZQUFyQztBQUNEOzs7NkJBRVM7QUFBQTs7QUFDUixVQUFJLFFBQVEsV0FBRSxLQUFGLENBQVMsWUFBRyxPQUFILENBQVcsS0FBSyxHQUFoQixDQUFULENBQVo7QUFBQSxVQUNFLFlBQVksS0FBSyxRQURuQjtBQUVBOztBQUVBLFlBQU0sT0FBTixDQUFlO0FBQUEsZUFBUSxPQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBUjtBQUFBLE9BQWY7O0FBRUEsWUFBTSxJQUFOLENBQVcsU0FBWCxFQUFzQixPQUF0QixDQUE4QixpQkFBUztBQUNyQyxjQUFNLGFBQU4sQ0FBb0Isd0JBQXBCLEVBQThDLGdCQUE5QyxDQUErRCxRQUEvRCxFQUF5RSxhQUFLO0FBQzVFLGNBQUksT0FBTyxNQUFNLE1BQU4sQ0FBYztBQUFBLG1CQUFRLEtBQUssRUFBTCxJQUFXLEVBQUUsTUFBRixDQUFTLEVBQTVCO0FBQUEsV0FBZCxDQUFYO0FBQ0E7O0FBRUEsY0FBSyxFQUFFLE1BQUYsQ0FBUyxPQUFkLEVBQXdCO0FBQ3RCLGNBQUUsTUFBRixDQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBaUMsR0FBakMsQ0FBcUMsVUFBckM7QUFDQSxpQkFBSyxDQUFMLEVBQVEsVUFBUixHQUFxQixJQUFyQjtBQUNELFdBSEQsTUFHTztBQUNMLGNBQUUsTUFBRixDQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBaUMsTUFBakMsQ0FBd0MsVUFBeEM7QUFDQSxpQkFBSyxDQUFMLEVBQVEsVUFBUixHQUFxQixLQUFyQjtBQUNEOztBQUVELHNCQUFHLE9BQUgsQ0FBWSxPQUFLLEdBQWpCLEVBQXNCLFdBQUUsU0FBRixDQUFZLEtBQVosQ0FBdEI7QUFDRCxTQWJEO0FBY0QsT0FmRDs7QUFpQkEsV0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLLE9BQXBDO0FBQ0EsV0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLLFFBQXBDO0FBQ0EsV0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLLFVBQXBDO0FBQ0Q7Ozs7OztrQkFyR2tCLFE7Ozs7Ozs7O0FDSHJCLElBQU0sWUFBWSxFQUFsQjtBQUFBLElBQ0UsSUFBSSxRQUFRLEdBRGQ7QUFBQSxJQUVFLElBQUksUUFGTjtBQUFBLElBR0UsSUFBSSxJQUhOO0FBQUEsSUFJRSxLQUFLLFlBSlA7O1FBT0UsUyxHQUFBLFM7UUFDQSxDLEdBQUEsQztRQUNBLEMsR0FBQSxDO1FBQ0EsQyxHQUFBLEM7UUFDQSxFLEdBQUEsRTs7Ozs7QUNYRjs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxPQUFPLFdBQUUsYUFBRixDQUFnQixPQUFoQixDQUFiO0FBQUEsSUFDRSxPQUFPLFdBQUUsYUFBRixDQUFnQixPQUFoQixDQURUO0FBQUEsSUFFRSxPQUFPLHVCQUFhLFFBQWIsQ0FGVDs7QUFJQSxLQUFLLE1BQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUpIHtcclxuICAgIHRoaXMuaWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2VcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgRU5URVJfS0VZLCBjLCBkLCBqLCBscyB9IGZyb20gJy4vaGVscGVycydcclxuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xyXG4gIGNvbnN0cnVjdG9yIChrZXkpIHtcclxuICAgIHRoaXMua2V5ID0ga2V5XHJcbiAgICBcclxuICAgIGlmICggIWxzLmdldEl0ZW0oa2V5KSApXHJcbiAgICAgIGxzLnNldEl0ZW0oIGtleSwgai5zdHJpbmdpZnkoW10pIClcclxuXHJcbiAgICB0aGlzLmFkZFRhc2sgPSB0aGlzLmFkZFRhc2suYmluZCh0aGlzKVxyXG4gICAgdGhpcy5lZGl0VGFzayA9IHRoaXMuZWRpdFRhc2suYmluZCh0aGlzKVxyXG4gICAgdGhpcy5yZW1vdmVUYXNrID0gdGhpcy5yZW1vdmVUYXNrLmJpbmQodGhpcylcclxuICB9XHJcblxyXG4gIGFkZFRhc2sgKGUpIHtcclxuICAgIC8vYyhlKVxyXG4gICAgaWYgKCAhZS50YXJnZXQudmFsdWUgKVxyXG4gICAgICBhbGVydCgnTm8gcHVlZGVzIGFncmVnYXIgdW5hIHRhcmVhIHZhY2lhJylcclxuICAgIFxyXG4gICAgaWYgKCBlLmtleUNvZGUgPT09IEVOVEVSX0tFWSApIHtcclxuICAgICAgbGV0IG5ld1Rhc2sgPSBuZXcgVGFzayggZS50YXJnZXQudmFsdWUgKSxcclxuICAgICAgICB0YXNrcyA9IGoucGFyc2UoIGxzLmdldEl0ZW0odGhpcy5rZXkpIClcclxuICAgICAgXHJcbiAgICAgIHRhc2tzLnB1c2goIG5ld1Rhc2sgKVxyXG4gICAgICBscy5zZXRJdGVtKCB0aGlzLmtleSwgai5zdHJpbmdpZnkodGFza3MpIClcclxuICAgICAgdGhpcy5yZW5kZXJUYXNrKCBuZXdUYXNrIClcclxuICAgICAgZS50YXJnZXQudmFsdWUgPSBudWxsXHJcbiAgICAgIC8vYyhuZXdUYXNrLCB0YXNrcywgbHMpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlZGl0VGFzayAoZSkge1xyXG4gICAgaWYgKCBlLnRhcmdldC5sb2NhbE5hbWUgPT09ICdsYWJlbCcgKSB7XHJcbiAgICAgIC8vYWxlcnQoJ2Z1bmNpb25hJylcclxuICAgICAgbGV0IHRhc2tzID0gai5wYXJzZSggbHMuZ2V0SXRlbSh0aGlzLmtleSkgKSxcclxuICAgICAgICB0b0VkaXQgPSAgdGFza3MuZmluZEluZGV4KCB0YXNrID0+IHRhc2submFtZSA9PT0gZS50YXJnZXQudGV4dENvbnRlbnQgKSxcclxuICAgICAgICBsYWJlbCA9IGQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke3Rhc2tzW3RvRWRpdF0uaWR9XCJdYClcclxuICAgICAgLy9jKHRhc2tzLCB0b0VkaXQsIHRhc2tzW3RvRWRpdF0pXHJcblxyXG4gICAgICBjb25zdCBzYXZlVGFzayA9IGUgPT4ge1xyXG4gICAgICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnRcclxuICAgICAgICB0YXNrc1t0b0VkaXRdLm5hbWUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxyXG4gICAgICAgIGxzLnNldEl0ZW0oIHRoaXMua2V5LCBqLnN0cmluZ2lmeSh0YXNrcykgKVxyXG4gICAgICAgIGUudGFyZ2V0LmJsdXIoKVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIGUgPT4gc2F2ZVRhc2soZSkgKVxyXG4gICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBlID0+ICggZS5rZXlDb2RlID09PSBFTlRFUl9LRVkgKSAmJiBzYXZlVGFzayhlKSApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVUYXNrIChlKSB7XHJcbiAgICBjKGUpXHJcbiAgICBpZiAoIGUudGFyZ2V0LmxvY2FsTmFtZSA9PT0gJ2EnICkge1xyXG4gICAgICAvL2FsZXJ0KCdlbGltaW5hcicpXHJcbiAgICAgIGxldCB0YXNrcyA9IGoucGFyc2UoIGxzLmdldEl0ZW0odGhpcy5rZXkpICksXHJcbiAgICAgICAgdG9SZW1vdmUgPSAgdGFza3MuZmluZEluZGV4KCB0YXNrID0+IHRhc2suaWQudG9TdHJpbmcoKSA9PT0gZS50YXJnZXQuZGF0YXNldC5pZCApXHJcbiAgICAgIC8vYyh0YXNrcywgdG9SZW1vdmUpXHJcbiAgICAgIFxyXG4gICAgICB0YXNrcy5zcGxpY2UodG9SZW1vdmUgLDEpXHJcbiAgICAgIGxzLnNldEl0ZW0oIHRoaXMua2V5LCBqLnN0cmluZ2lmeSh0YXNrcykgKVxyXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXJUYXNrICh0YXNrKSB7XHJcbiAgICBsZXQgdGVtcGxhdGVUYXNrID0gYFxyXG4gICAgICA8bGkgY2xhc3M9XCJMaXN0LWl0ZW0gJHt0YXNrLmlzQ29tcGxldGUgPyAnY29tcGxldGUnIDogJyd9XCI+XHJcbiAgICAgICAgPGlucHV0IGlkPVwiJHt0YXNrLmlkfVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiTGlzdC1jaGVja2JveFwiICR7dGFzay5pc0NvbXBsZXRlID8gJ2NoZWNrZWQnIDogJyd9PlxyXG4gICAgICAgIDxsYWJlbCBkYXRhLWlkPVwiJHt0YXNrLmlkfVwiIGNsYXNzPVwiTGlzdC1sYWJlbFwiIGNvbnRlbnRlZGl0YWJsZSAgc3BlbGxjaGVjaz4ke3Rhc2submFtZX08L2xhYmVsPlxyXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS1pZD1cIiR7dGFzay5pZH1cIiBjbGFzcz1cIkxpc3QtcmVtb3ZlTGlua1wiPiYjMTI4NDY1OzwvYT5cclxuICAgICAgPC9saT5cclxuICAgIGBcclxuICAgIGxpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZVRhc2spXHJcbiAgfVxyXG5cclxuICByZW5kZXIgKCkge1xyXG4gICAgbGV0IHRhc2tzID0gai5wYXJzZSggbHMuZ2V0SXRlbSh0aGlzLmtleSkgKSxcclxuICAgICAgbGlzdFRhc2tzID0gbGlzdC5jaGlsZHJlblxyXG4gICAgLy9jKHRhc2tzLCBsaXN0VGFza3MpXHJcblxyXG4gICAgdGFza3MuZm9yRWFjaCggdGFzayA9PiB0aGlzLnJlbmRlclRhc2sodGFzaykgKVxyXG4gICAgXHJcbiAgICBBcnJheS5mcm9tKGxpc3RUYXNrcykuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICAgIGlucHV0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xyXG4gICAgICAgIGxldCB0YXNrID0gdGFza3MuZmlsdGVyKCB0YXNrID0+IHRhc2suaWQgPT0gZS50YXJnZXQuaWQgKVxyXG4gICAgICAgIC8vYyh0YXNrKVxyXG5cclxuICAgICAgICBpZiAoIGUudGFyZ2V0LmNoZWNrZWQgKSB7XHJcbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJylcclxuICAgICAgICAgIHRhc2tbMF0uaXNDb21wbGV0ZSA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpXHJcbiAgICAgICAgICB0YXNrWzBdLmlzQ29tcGxldGUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbHMuc2V0SXRlbSggdGhpcy5rZXksIGouc3RyaW5naWZ5KHRhc2tzKSApXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIHRhc2suYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmFkZFRhc2spXHJcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0VGFzaylcclxuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZVRhc2spXHJcbiAgfVxyXG59IiwiY29uc3QgRU5URVJfS0VZID0gMTMsXHJcbiAgYyA9IGNvbnNvbGUubG9nLFxyXG4gIGQgPSBkb2N1bWVudCxcclxuICBqID0gSlNPTixcclxuICBscyA9IGxvY2FsU3RvcmFnZVxyXG5cclxuZXhwb3J0IHtcclxuICBFTlRFUl9LRVksXHJcbiAgYyxcclxuICBkLFxyXG4gIGosXHJcbiAgbHNcclxufSIsImltcG9ydCB7IGQgfSBmcm9tICcuL2hlbHBlcnMnXHJcbmltcG9ydCBUb0RvTGlzdCBmcm9tICcuL1RvRG9MaXN0J1xyXG5cclxuY29uc3QgdGFzayA9IGQucXVlcnlTZWxlY3RvcignI3Rhc2snKSxcclxuICBsaXN0ID0gZC5xdWVyeVNlbGVjdG9yKCcjbGlzdCcpLFxyXG4gIHRvZG8gPSBuZXcgVG9Eb0xpc3QoJ2VkTGlzdCcpXHJcblxyXG50b2RvLnJlbmRlcigpIl19
