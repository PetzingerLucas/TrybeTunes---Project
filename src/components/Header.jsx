import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../pages/trybeTunesLogo.svg';
import defaultUser from '../pages/defaultUser.jpg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
      image: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ loading: true }, async () => {
      const USER = await getUser();
      this.setState({ user: USER.name, loading: false, image: USER.image });
    });
  }

  render() {
    const { user, loading, image } = this.state;
    const { page } = this.props;
    return (
      <div
        className="header-content"
        data-testid="header-component"
      >
        <div className="div-logo">
          <img src={ logo } alt="" />
          {loading ? (<Loading />)
            : (
              <div className="div-user">

                {' '}
                <img
                  className="user-img"
                  src={ image !== '' ? image : defaultUser }
                  alt=""
                />
                <h4 data-testid="header-user-name">{user}</h4>
              </div>
            )}
        </div>
        <div className="nav-bar">
          <Link
            className={ page === '/search' && 'selected' }
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisa

          </Link>
          <Link
            className={ page === '/favorites' && 'selected' }
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos

          </Link>
          <Link
            className={ page === '/profile' && 'selected' }
            data-testid="link-to-profile"
            to="/profile"
          >
            Meu Perfil

          </Link>
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  page: propTypes.string.isRequired,
};
export default Header;
