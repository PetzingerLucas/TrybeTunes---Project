import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      albumInfo: [],
      collection: '',
      artist: '',
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
      const { location: { pathname } } = this.props;
      const albumID = pathname.split('/');
      const results = await getMusics(albumID[2]);
      const filteredResults = results.filter((album) => album.kind === 'song');
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ loading: false,
        albumInfo: [...filteredResults],
        collection: results[0].collectionName,
        artist: results[0].artistName,
        favoriteSongs: [...favoriteSongs],
        coverAlbum: results[0].artworkUrl60 });
    });
  }

  render() {
    const { albumInfo,
      collection,
      artist,
      coverAlbum,
      loading,
      favoriteSongs,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (<Loading />)
          : (
            <div className="album-page">
              <div className="selected-album">
                <img src={ coverAlbum } alt={ coverAlbum } />
                <h3 data-testid="album-name">{collection}</h3>
                <span data-testid="artist-name">{artist}</span>
              </div>
              <div className="music-list">
                {albumInfo.map((album) => (
                  <MusicCard
                    key={ album.trackId }
                    trackName={ album.trackName }
                    previewUrl={ album.previewUrl }
                    trackId={ album.trackId }
                    song={ album }
                    favoriteSongs={ favoriteSongs }
                    favoriteUpdate={ this.updateFavorites }

                  />

                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.objectOf(propTypes.number),
  }),
}.isRequired;

export default Album;
