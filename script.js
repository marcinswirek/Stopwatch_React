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

  //   print = () => {
  //     this.display.innerText = this.format(this.times);
  //   };

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
    //this.print();
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

  results = times => {
    let elementList = document.createElement("li");
    let resultsElement = document.querySelector(".results");
    if (
      this.times.minutes !== 0 ||
      this.times.seconds !== 0 ||
      this.times.miliseconds !== 0
    ) {
      elementList.innerHTML = `${this.format(this.times)}`;
      resultsElement.appendChild(elementList);
    }
  };

  stop = () => {
    this.setState({
      running: false
    });
    this.results(this.times);
    clearInterval(this.watch);
  };

  clear = () => {
    this.stop();
    this.reset();
  };

  //   clearWatch = () => {
  //     this.print();
  //   };

  //   clearResults = () => {
  //     const mainList = document.querySelector(".results");
  //     while (mainList.firstChild) {
  //       mainList.removeChild(mainList.firstChild);
  //     }
  //   };

  addNewResult = () => {
    let newResult = {
      id: this.state.resultsTable.length,
      record: this.format()
    };

    this.setState({ resultsTable: [...this.state.resultsTable, newResult] });
    console.log(this.state.resultsTable);
  };

  clearResults = () => {
    this.setState({ resultsTable: [] });
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
          <a href="#" className={"btn btn-clear"} onClick={() => this.clear()}>
            Clear
          </a>
          <a
            href="#"
            className={"btn btn-clear-watch"}
            onClick={() => this.clearResults()}
          >
            Clear results
          </a>
        </nav>
        <Display time={this.format()} />
        {/* <Results resultsTable={this.results} /> */}
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

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    resultsTable: React.PropTypes.array.isRequired
  };

  render() {
    let results = this.props.resultsTable.map(ele => {
      return React.createElement("li", { key: ele.id }, ele.record);
    });
    return React.createElement(
      "ul",
      { className: "results" },
      React.createElement("p", {}, "Results"),
      results
    );
  }
}

var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById("app"));
