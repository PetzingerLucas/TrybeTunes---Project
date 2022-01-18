import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchAlbum();
  }

  updateFavorites = async () => {
    const fetchFavoriteSongs = await getFavoriteSongs();
    this.setState(() => ({ favoriteSongs: [...fetchFavoriteSongs] }));
  }

  fetchAlbum = async () => {
    this.setState({ loading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ loading: false,
        favoriteSongs: [...favoriteSongs] });
    });
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header page="/favorites" />
        {loading ? (<Loading />)
          : (
            <div className="favorite-page">
              <h2 className="favorite-music-text">Musicas Favoritas:</h2>
              <div className="music-list">
                {favoriteSongs.map((song) => (
                  <MusicCard
                    key={ song.trackId }
                    trackName={ song.trackName }
                    previewUrl={ song.previewUrl }
                    trackId={ song.trackId }
                    song={ song }
                    favoriteSongs={ favoriteSongs }
                    favoriteUpdate={ this.updateFavorites }
                    imgSong={ song.artworkUrl100 }

                  />

                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}
export default Favorites;
