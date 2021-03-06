import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

import AuthScreen from './AuthView'
import HomeScreen from './HomeView'

class LoginView extends Component {
  constructor(props){
    super(props);
  }

  _login = (username, password) => {
    this.props.authenticate({ username: username, password: password });
  }

  _signup = (username, password, fullName) => {
    this.setState({ isLoading: true })
    setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */
  render () {
    if (this.props.isAppReady) {
      Actions.RequestsList();
    } else {
      return (
        <AuthScreen
          login={this._login}
          signup={this._signup}
          isLoggedIn={this.props.isLoggedIn}
          isLoading={this.props.isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
      )
    }
  }
}

/* Connects to the actions, so we can do stuff! Boilerplate!!! */
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
      isLoggedIn: state.userAuth.isLoggedIn,
      isLoading: state.userAuth.isLoading,
      isAppReady: state.userAuth.isAppReady
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
