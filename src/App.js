import React, { Component } from 'react';
import axios from 'axios';

import FacebookLogin from './TestLoginFB.js';

import './App.css';
const baseUrl = '' //please insert url here

const loginSocial = () => {
  return axios.get(`${baseUrl}/authenticate/facebook`, {
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Content-Type': 'application/json',
      'Cache': 'no-cache',
      'Access-Control-Allow-Origin': "*",
    },
      withCredentials: true,
  })
  .then(response => console.log('response', response))
  .catch(err => { console.log(err);
  });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To login using regular FB client procedure:
          <FacebookLogin/>
        </p>
        <p className="App-intro">
          To login using axios.get() + auth route:
          <br/>
          <button onClick={loginSocial}>LOGIN WITH AXIOS</button>
        </p>
      </div>
    );
  }
}

export default App;
