import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import defaultUser from './defaultUser.jpg';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ loading: true }, async () => {
      const USER = await getUser();
      this.setState({ user: USER.name,
        email: USER.email,
        description: USER.description,
        image: USER.image,
        loading: false });
    });
  }

  render() {
    const { loading, user, image, email, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header page="/profile" />
        {loading ? (<Loading />) : (
          <div className="profile-page">
            <div className="img-button">
              <img
                data-testid="profile-image"
                src={ image !== '' ? image : defaultUser }
                alt=""
              />
              <Link
                className="edit-profile-button"
                to="/profile/edit"
              >
                <p>Editar perfil</p>
              </Link>
            </div>
            <h4>Nome</h4>
            <span>{user}</span>
            <h4>E-mail</h4>
            <span>{email}</span>
            <h4>Descrição</h4>
            <span>{description}</span>

          </div>
        )}
      </div>);
  }
}

export default Profile;
