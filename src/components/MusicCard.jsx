import propTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteCheck: false,
    };
  }

  componentDidMount() {
    this.validationCheck();
  }

    onInputCheckbox = ({ target }) => {
      this.fetchSongs(target);
      this.setState((prevState) => (
        { favoriteCheck: !prevState.favoriteCheck }));
    }

    validationCheck =() => {
      const { trackId, favoriteSongs } = this.props;
      const mapIds = favoriteSongs.map((favorite) => favorite.trackId);
      const validationCheck = mapIds.includes(trackId);
      if (validationCheck) { this.setState({ favoriteCheck: true }); }
    }

    fetchSongs =(target) => {
      const { favoriteUpdate } = this.props;

      this.setState({ loading: true }, async () => {
        const { song } = this.props;
        if (target.checked) { addSong(song); } else { removeSong(song); }
        await favoriteUpdate();
        this.setState({ loading: false });
      });
    }

    render() {
      const { trackName, previewUrl, trackId, imgSong } = this.props;
      const { favoriteCheck, loading } = this.state;
      return (
        loading ? (<Loading />)
          : (
            <div className=" music">
              <h4>{trackName}</h4>
              <img className="img-song" src={ imgSong } alt="" />
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label
                htmlFor={ trackId }
              >
                Favorita
                <input
                  name="favorite"
                  checked={ favoriteCheck }
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  onChange={ this.onInputCheckbox }
                />

              </label>
            </div>
          ));
    }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  favoriteUpdate: propTypes.func.isRequired,
  song: propTypes.objectOf(propTypes.any).isRequired,
  favoriteSongs: propTypes.arrayOf(propTypes.any).isRequired,
  imgSong: propTypes.string.isRequired,
};

export default MusicCard;
