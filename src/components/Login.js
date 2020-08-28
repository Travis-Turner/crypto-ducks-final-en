import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Login.css';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }
  handleSubmit(){
    if (!this.state.username || !this.state.password){
      return;
    }
    duckAuth.authorize(this.state.username, this.state.password)
    .then((data) => {
      if (data.jwt){
        this.setState({email: '', password: ''} ,() => {
        this.props.handleLogin();
        this.props.history.push('/ducks');
        })
      }  
    })
    .catch(err => console.log(err));
  }
  render(){
    return(
      <div className="login">
        <Logo title={'CryptoDucks'}/>
        <p className="login__welcome">
          This app contains highly sensitive information. 
          Please sign in or register to access CryptoDucks.
        </p>
        <form className="login__form">
          <label>
            Username:
          </label>
          <input required name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <label>
            Password:
          </label>
          <input required name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        </form>
        <div className="login__button-container">
          <button onClick={this.handleSubmit} className="login__link">Log in</button>
        </div>
        <div className="login__signup">
          <p>Not a member yet?</p>
          <Link to="/register" className="signup__link">Sign up here</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);