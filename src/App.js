import React, { Component } from "react";
import './App.css';
import { Helmet } from 'react-helmet-async';
import { MyStylesheet } from "./components/styles";
import Header from "./components/header";


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
          <div style={{ ...styles.generalContainer }}>
           App
          </div>
        </main>


      </div>
    );

  }
}

export default App;
