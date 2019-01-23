import React, { Component } from 'react';
import './App.css';
import logo from './images/logo.png'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Launches from './components/Launches';
import LaunchDetail from './components/LaunchDetail';
import Header from './components/Header';
//https://www.spacex.com/sites/spacex/files/bfrlunar_v2.jpg


const client = new ApolloClient({
  uri: "/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="bg-image">
            {/* <div style={{ height: 50, background: 'black', paddingTop: 10 }}>
              <img style={{ width: 200, display: 'block', margin: 'auto' }} src={logo} alt="spacexlogo"/>
            </div> */}
            <Header></Header>
            <div className="container">            
                <Route exact path="/details/:flight_number" component={LaunchDetail} />            
                <Route exact path="/" component={Launches} />          
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
