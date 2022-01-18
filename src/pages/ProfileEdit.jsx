import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
      email: '',
      description: '',
      image: '',
      disableButton: true,
      saved: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  onInputChange = ({ target }) => {
    const { user, email, image, description } = this.state;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const validationSuccess = user && email && image && description !== '';
      if (validationSuccess) {
        this.setState({ disableButton: false });
      } else {
        this.setState({ disableButton: true });
      }
    });
  }

  fetchUser = async () => {
    this.setState({ loading: true }, async () => {
      const USER = await getUser();
      this.setState({ user: USER.name,
        email: USER.email,
        description: USER.description,
        image: USER.image,
        loading: false,
        disableButton: true });
    });
  }

  handleClick = (e) => {
    const { user, email, image, description } = this.state;
    e.preventDefault();
    this.setState({ loading: true }, async () => {
      await updateUser({
        name: user,
        email,
        image,
        description,
      });
      this.setState({ loading: false, saved: true });
    });
  }

  render() {
    const { loading, image, disableButton, saved, user, email, description } = this.state;
    const validationSuccess = user && email && image && description !== '';
    return (
      <div data-testid="page-profile-edit">
        <Header page="/profile" />
        {saved && <Redirect to="/profile" />}
        {loading ? (<Loading />) : (
          <div className="profile-edit-page">

            <form action="">
              <div className="img-button">
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt=""
                />
                <input
                  data-testid="edit-input-image"
                  name="image"
                  value={ image }
                  placeholder="Insira um link"
                  type="text"
                  minLength={ 1 }
                  onChange={ this.onInputChange }
                />
              </div>
              <label htmlFor="input">
                Nome
                {' '}
                <input
                  name="user"
                  value={ user }
                  data-testid="edit-input-name"
                  type="text"
                  required
                  minLength={ 1 }
                  onChange={ this.onInputChange }
                />
              </label>
              <label
                htmlFor="input-email"
              >
                E-mail
                {' '}
                <input
                  name="email"
                  value={ email }
                  data-testid="edit-input-email"
                  type="email"
                  required
                  minLength={ 1 }
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="input">
                Descrição
                {' '}
                <textarea
                  value={ description }
                  data-testid="edit-input-description"
                  placeholder="Sobre mim"
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  required
                  minLength={ 1 }
                  onChange={ this.onInputChange }
                />
              </label>

              <button
                data-testid="edit-button-save"
                type="button"
                className="save-profile-button"
                onClick={ this.handleClick }
                disabled={ validationSuccess ? false : disableButton }
              >
                Salvar

              </button>
            </form>
          </div>
        )}
      </div>);
  }
}

export default ProfileEdit;
