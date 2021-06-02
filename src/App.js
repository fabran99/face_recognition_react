import React, { Component } from "react";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// React router
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";

var socket = socketIOClient("http://127.0.0.1:5000");
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: "Nada",
    };
  }

  componentDidMount() {
    socket.on("get_saved_configuration", (data) => {
      console.log(data);
    });

    socket.emit("get_saved_configuration");
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <h1>{this.state.res}</h1>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
