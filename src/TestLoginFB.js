import React, { Component } from 'react';

export default class FacebookLogin extends Component {

  componentDidMount() {
    (function (d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
      if (window.FB) {
        window.FB.init({
          appId: '', //please insert appId as NUMBER here
          xfbml: true,
          cookie: true,
          version: 'v2.5',
        });
      } else {
        console.log('No FB')
      }
    }
  }

  responseApi = (authResponse) => {
    window.FB.api('/me', { fields: 'id,name,email' }, (me) => {
      me.accessToken = authResponse.accessToken;
      console.log('responseApi', me)
      //this.props.responseHandler(me);
    });
  }

  checkLoginState = (response) => {
    if (response.authResponse) {
      console.log('response 1', response.status, response)
      this.responseApi(response.authResponse);
    } else {
      // if (this.props.responseHandler) {
      //   this.props.responseHandler({ status: response.status });
      // }
      console.log('response 2', response.status, response)
    }
  }

  clickHandler = () => {
    window.FB.login(this.checkLoginState, { scope: 'public_profile,email' });
  }

  render() {
    // const {
    //   socialId, xfbml, cookie, version, language, fields, responseHandler,
    //   children, buttonText, ...props
    // } = this.props;

    return (
      <button onClick={this.clickHandler}>
        login FB (FB client side procedure)
      </button>
    );
  }
}
