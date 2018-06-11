"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StopWatch = function (_React$Component) {
  _inherits(StopWatch, _React$Component);

  function StopWatch(props) {
    _classCallCheck(this, StopWatch);

    var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

    _this.reset = function () {
      _this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    };

    _this.pad0 = function (value) {
      var result = value.toString();
      var resultLength = result.length;
      if (resultLength < 2) {
        result = 0 + result;
      }
      return result;
    };

    _this.print = function () {
      _this.display.innerText = _this.format(_this.times);
    };

    _this.format = function () {
      var minutes = _this.state.times.minutes;
      var seconds = _this.state.times.seconds;
      var miliseconds = _this.state.times.miliseconds;
      return _this.pad0(minutes) + ":" + _this.pad0(seconds) + ":" + _this.pad0(Math.floor(miliseconds));
    };

    _this.start = function () {
      if (!_this.state.running) {
        _this.running = true;
        _this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    };

    _this.step = function () {
      if (!_this.state.running) return;
      _this.calculate();
      _this.print();
    };

    _this.calculate = function () {
      _this.times.miliseconds += 1;

      if (_this.times.miliseconds >= 100) {
        _this.times.seconds += 1;
        _this.times.miliseconds = 0;
      }

      if (_this.times.seconds >= 60) {
        _this.times.minutes = +1;
        _this.times.seconds = 0;
      }
    };

    _this.results = function (times) {
      var resultsList = document.createElement("li");
      var resultsElement = document.querySelector(".results");
      if (_this.times.minutes !== 0 || _this.times.seconds !== 0 || _this.times.miliseconds !== 0) {
        resultsList.innerHTML = "" + _this.format(_this.times);
        resultsElement.appendChild(resultsList);
      }
    };

    _this.stop = function () {
      _this.setState({
        running: false
      });
      clearInterval(_this.watch);
    };

    _this.clear = function () {
      _this.stop();
      _this.reset();
    };

    _this.clearWatch = function () {
      _this.print();
    };

    _this.render = function () {
      return React.createElement(
        "div",
        { className: "controls" },
        React.createElement(
          "nav",
          null,
          React.createElement(
            "a",
            { href: "#", className: "btn btn-start", onClick: function onClick() {
                return _this.start();
              } },
            "Start"
          ),
          React.createElement(
            "a",
            { href: "#", className: "btn btn-stop", onClick: function onClick() {
                return _this.stop();
              } },
            "Stop"
          ),
          React.createElement(
            "a",
            { href: "#", className: "btn btn-start", onClick: function onClick() {
                return _this.clear();
              } },
            "Clear"
          ),
          React.createElement(
            "a",
            { href: "#", className: "btn btn-start", onClick: function onClick() {
                return _this.start();
              } },
            "Clear results"
          )
        ),
        React.createElement(Display, { time: _this.format() })
      );
    };

    _this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    };
    return _this;
  }

  return StopWatch;
}(React.Component);

var Display = function (_React$Component2) {
  _inherits(Display, _React$Component2);

  function Display(props) {
    _classCallCheck(this, Display);

    return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
  }

  _createClass(Display, [{
    key: "render",
    value: function render() {
      return React.createElement("div", { className: "stopWatch" }, this.props.time);
    }
  }]);

  return Display;
}(React.Component);

Display.propTypes = {
  time: React.PropTypes.string.isRequired
};

var Results = function (_React$Component3) {
  _inherits(Results, _React$Component3);

  function Results(props) {
    _classCallCheck(this, Results);

    return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));
  }

  _createClass(Results, [{
    key: "render",
    value: function render() {
      var results = this.props.history.map(function (ele) {
        return React.createElement("li", { key: ele.id }, ele.record);
      });
      return React.createElement("ol", { className: "results" }, React.createElement("p", {}, "Results"), results);
    }
  }]);

  return Results;
}(React.Component);

Results.propTypes = {
  history: React.PropTypes.array.isRequired
};


var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById("app"));
