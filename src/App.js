import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import FacebookLogin from './TestLoginFB.js';

import './App.css';
const baseUrl = //please insert url here

const loginSocial = () => {
  return axios.get(`${baseUrl}/authenticate/facebook`)
    // ,
  //   {
  //   headers: {
  //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  //     'Content-Type': 'application/json',
  //     'Cache': 'no-cache',
  //     'Access-Control-Allow-Origin': "*",
  //   },
  //     withCredentials: true,
  // })
  .then(response => console.log('response', response))
  .catch(err => { console.log(err);
  });
}

const FBIframe = () => {
  return <iframe
    src={`${baseUrl}/authenticate/facebook`}
    sandbox='allow-scripts'
    height={500}
    width={300}
  ></iframe>
}

const getUser = () => {
  return axios.get(`${baseUrl}/user/profile`, {
    headers: {
      // 'Accept': 'application/json',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Content-Type': 'application/json',
      'Cache': 'no-cache',
      'mode': 'cors',
    },
      withCredentials: true,
  })
  .then(res => {
    console.log('GET USR', res)
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error('something went wrong!');
    }
  })
  .then(data => data)
  .catch(err =>  console.log(err))
}

class FBNew extends Component {
  render(){
    return window.open(`${baseUrl}/authenticate/facebook`, '_blank');
  }
}

class MyWindowPortal extends React.PureComponent {
  //https://stackoverflow.com/questions/34507160/how-can-i-handle-an-event-to-open-a-window-in-react-js
  //https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202
  constructor(props) {
    super(props);
    this.containerEl = document.createElement('div');
    this.externalWindow = null;
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }

  componentDidMount() {
    this.externalWindow = window.open(`${baseUrl}/authenticate/facebook`, '', 'width=600,height=400,left=200,top=200');
    this.externalWindow.document.body.appendChild(this.containerEl);
  }

  componentWillUnmount() {
    this.externalWindow.close();
  }
}

class App extends Component {
  state={
    open: false,
    showWindowPortal: false,
  }
  openLoginWindow = () => {
    return window.open(`${baseUrl}/authenticate/facebook`, '_parent');
  }
  // openLoginWindow = () => {
  //   this.setState({open: true})
  // }
  toggleWindowPortal = () => {
    this.setState(state => ({
      ...state,
      showWindowPortal: !state.showWindowPortal,
    }));
  }

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
        <p className="App-intro">
          Try window.open() + auth route:
          <br/>
          <button onClick={this.openLoginWindow}>LOGIN WINDOW</button>
          {this.state.open && <FBIframe/>}
        </p>
        <p className="App-intro">
          GET USER:
          <br/>
          <button onClick={getUser}>GET USER</button>
        </p>

        <div>
        <h1>With React16</h1>

        <button onClick={this.toggleWindowPortal}>
          {this.state.showWindowPortal ? 'Close the' : 'Open a'} Portal
        </button>

        {this.state.showWindowPortal && (
          <MyWindowPortal>
            <p>Even though I render in a different window, I share state!</p>

            <button onClick={() => this.setState({ showWindowPortal: false })} >
              Close me!
            </button>
          </MyWindowPortal>
        )}
      </div>
      </div>
    );
  }
}

export default App;
