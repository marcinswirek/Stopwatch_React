class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
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

  print = () => {
    this.display.innerText = this.format(this.times);
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
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  };

  step = () => {
    if (!this.state.running) return;
    this.calculate();
    this.print();
  };

  calculate = () => {
    this.times.miliseconds += 1;

    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }

    if (this.times.seconds >= 60) {
      this.times.minutes = +1;
      this.times.seconds = 0;
    }
  };

  results = times => {
    let resultsList = document.createElement("li");
    let resultsElement = document.querySelector(".results");
    if (
      this.times.minutes !== 0 ||
      this.times.seconds !== 0 ||
      this.times.miliseconds !== 0
    ) {
      resultsList.innerHTML = `${this.format(this.times)}`;
      resultsElement.appendChild(resultsList);
    }
  };

  stop = () => {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  };

  clear = () => {
    this.stop();
    this.reset();
  };

  clearWatch = () => {
    this.print();
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
          <a href="#" className={"btn btn-start"} onClick={() => this.clear()}>
            Clear
          </a>
          <a href="#" className={"btn btn-start"} onClick={() => this.start()}>
            Clear results
          </a>
        </nav>
        <Display time={this.format()} />
      </div>
    );
  };
}

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

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    history: React.PropTypes.array.isRequired
  };

  render() {
    let results = this.props.history.map(ele => {
      return React.createElement("li", { key: ele.id }, ele.record);
    });
    return React.createElement(
      "ol",
      { className: "results" },
      React.createElement("p", {}, "Results"),
      results
    );
  }
}

var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById("app"));
