import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from './LOGO_POSITIVA_1.png';
import defaultUser from './defaultUser.jpg';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      logged: false,
      loading: false,
      disableButton: true,
    };
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  handleClick =(event) => {
    const { userName } = this.state;
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      await createUser({ name: userName, image: defaultUser });
      this.setState({
        loading: false,
        logged: true });
    });
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const validationLength = target.value.length >= target.minLength;
      if (validationLength) {
        this.setState({ disableButton: false });
      } else {
        this.setState({ disableButton: true });
      }
    });
  }

  render() {
    const { disableButton, userName, logged, loading } = this.state;
    return (

      <div data-testid="page-login">

        {logged && <Redirect to="/search" />}
        {loading
          ? (
            <Loading />
          ) : (
            <div className="login-page">
              <img src={ logo } alt="" />
              <form className="login-form" action="">

                <label className="label-name" htmlFor="login-name-input">
                  <input
                    placeholder="Nome"
                    minLength="3"
                    data-testid="login-name-input"
                    className="input-name"
                    type="text"
                    value={ userName }
                    name="userName"
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  className="login-button"
                  disabled={ disableButton }
                  data-testid="login-submit-button"
                  type="submit"
                  onClick={ this.handleClick }
                >
                  Entrar

                </button>
              </form>
            </div>)}
      </div>
    );
  }
}
export default Login;
