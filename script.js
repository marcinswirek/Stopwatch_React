class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      resultsTable: []
    };
  }

  reset = () => {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  };

  pad0 = value => {
    let result = value.toString();
    const resultLength = result.length;
    if (resultLength < 2) {
      result = 0 + result;
    }
    return result;
  };

  format = () => {
    let minutes = this.state.times.minutes;
    let seconds = this.state.times.seconds;
    let miliseconds = this.state.times.miliseconds;
    return `${this.pad0(minutes)}:${this.pad0(seconds)}:${this.pad0(
      Math.floor(miliseconds)
    )}`;
  };

  start = () => {
    if (!this.state.running) {
      this.state.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  };

  step = () => {
    if (!this.state.running) return;
    this.calculate();
  };

  calculate = () => {
    this.setState({
      times: {
        minutes: this.state.times.minutes,
        seconds: this.state.times.seconds,
        miliseconds: this.state.times.miliseconds + 1
      }
    });

    if (this.state.times.miliseconds >= 100) {
      this.state.times.seconds += 1;
      this.state.times.miliseconds = 0;
    }

    if (this.state.times.seconds >= 60) {
      this.state.times.minutes = +1;
      this.state.times.seconds = 0;
    }
  };

  stop = () => {
    this.setState({
      running: false
    });
  };

  render = () => {
    return (
      <div className={"controls"}>
        <nav>
          <a href="#" className={"btn btn-start"} onClick={() => this.start()}>
            Start
          </a>
          <a href="#" className={"btn btn-stop"} onClick={() => this.stop()}>
            Stop
          </a>
          <a href="#" className={"btn btn-clear"} onClick={() => this.reset()}>
            Clear
          </a>
        </nav>
        <Display time={this.format()} />
      </div>
    );
  };
}

//Displays all App
class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    time: React.PropTypes.string.isRequired
  };

  render() {
    return React.createElement(
      "div",
      { className: "stopWatch" },
      this.props.time
    );
  }
}

var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById("app"));
