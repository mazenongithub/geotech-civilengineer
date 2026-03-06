import React, { Component } from "react";
import './App.css';
import * as actions from './components/actions';
import { connect } from 'react-redux';
import Header from "./components/header";
import { Route, Switch } from 'react-router-dom';
import Home from "./components/home";
import Login from "./components/login";
import Contact from './components/contact'
import Features from './components/features'
import { CheckUser } from "./components/actions/api";
import Profile from "./components/profile";
import MyProjects from "./components/myprojects";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { render: '', width: 0, height: 0, open: false }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    this.checkUser()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async checkUser() {
    try {
      const response = await CheckUser();
      console.log("CheckUser response:", response);

      // 1️⃣ Update Redux with client if available
      if (response?.client) {
        this.props.reduxUser(response.client);
      } else {
        console.warn("⚠️ No client returned.");
      }

      // 2️⃣ Update Redux with projects if available
      if (Array.isArray(response?.projects) && response.projects.length > 0) {
        this.props.reduxProjects(response.projects);
      } else {
        console.warn("⚠️ No projects found for this client.");
      }

      // 3️⃣ Optional: trigger render if needed (Redux should already handle re-render)
      // this.setState({ render: 'render' });

    } catch (err) {
      console.error("❌ Error checking user:", err);
    }
  }


  render() {

    return (
      <div className="App">



        <Header />
        <main className="main-content">

          {/* Page content goes here */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/features" component={Features} />
            <Route exact path="/profile/:clientid" component={Profile} />
            <Route exact path="/myprojects/:clientid" component={MyProjects} />
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
