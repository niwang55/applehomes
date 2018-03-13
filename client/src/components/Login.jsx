import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      wrongPassword: null
    };
  }

  componentDidMount() {
    axios.get('/api/authenticate')
    .then(response => {
      if (response.data.authenticated) {
        browserHistory.push('/useroptions');
      }
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    }); 
  }

  handleLogin(e) {
    e.preventDefault();

    axios.post('/api/login', {
      password: this.state.password
    })
    .then(response => {
      if (response.data.authenticated) {
        browserHistory.push('/useroptions');
      } else {
        this.setState({
          wrongPassword: true
        });
      }
    })
    .catch(error => {
      console.log('Error in login', error);
    });
  }

  render() {
    return (
      <div className="login-page">

        <div className="login-form">
          <form>
            <input onChange={this.handlePasswordChange.bind(this)} value={this.state.password} type="password" placeholder="Password" />
            <button onClick={this.handleLogin.bind(this)}>Login</button>
          </form>
        </div>

        { this.state.wrongPassword && 
          <div>
            Wrong password
          </div>
        }

      </div>
    );
  }
}