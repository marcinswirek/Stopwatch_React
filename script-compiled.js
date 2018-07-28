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

    _this.format = function () {
      var minutes = _this.state.times.minutes;
      var seconds = _this.state.times.seconds;
      var miliseconds = _this.state.times.miliseconds;
      return _this.pad0(minutes) + ":" + _this.pad0(seconds) + ":" + _this.pad0(Math.floor(miliseconds));
    };

    _this.start = function () {
      if (!_this.state.running) {
        _this.state.running = true;
        _this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    };

    _this.step = function () {
      if (!_this.state.running) return;
      _this.calculate();
    };

    _this.calculate = function () {
      _this.setState({
        times: {
          minutes: _this.state.times.minutes,
          seconds: _this.state.times.seconds,
          miliseconds: _this.state.times.miliseconds + 1
        }
      });

      if (_this.state.times.miliseconds >= 100) {
        _this.state.times.seconds += 1;
        _this.state.times.miliseconds = 0;
      }

      if (_this.state.times.seconds >= 60) {
        _this.state.times.minutes = +1;
        _this.state.times.seconds = 0;
      }
    };

    _this.stop = function () {
      _this.setState({
        running: false
      });
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
            { href: "#", className: "btn btn-clear", onClick: function onClick() {
                return _this.reset();
              } },
            "Clear"
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
      },
      resultsTable: []
    };
    return _this;
  }

  return StopWatch;
}(React.Component);

//Displays all App


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


var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById("app"));
