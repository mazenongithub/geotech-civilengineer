import React, { Component } from "react";
import './App.css';
import * as actions from './components/actions';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { MyStylesheet } from "./components/styles";
import Header from "./components/header";
import { Route, Switch } from 'react-router-dom';
import Home from "./components/home";
import Login from "./components/login";
import Contact from './components/contact'


class App extends Component {

  
  render() {
    const styles = MyStylesheet();
    return (
      <div className="App">

        <Helmet>
         

        </Helmet>

        <Header />
        <main className="main-content">

          {/* Page content goes here */}
           <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/contact" component={Contact} />
           </Switch>
        </main>


      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    myuser: state.myuser,
    projects: state.projects,
  }
}

export default connect(mapStateToProps, actions)(App);
