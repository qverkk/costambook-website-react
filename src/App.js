import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/styles";
import {
  createMuiTheme, CssBaseline
} from "@material-ui/core";
import { HashRouter as Router } from 'react-router-dom';
import HomeView from "./HomeView"
import { connect } from 'react-redux';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path='/' component={HomeView} />
              <Route exact path='/user/:id' component={UserProfile} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect(null, null)(App)
