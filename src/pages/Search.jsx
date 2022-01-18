import React, * as react from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends react.Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      disableButton: true,
      foundAlbuns: [],
      loading: false,
      notFound: false,
      artistSearch: '',
    };
  }

  onInputSearchChange = ({ target }) => {
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

 fechArtists= async (e) => {
   e.preventDefault();
   const { inputSearch } = this.state;
   this.setState({ loading: true }, async () => {
     const results = await searchAlbumsAPI(inputSearch);
     const albumNotFound = results.length === 0;
     this.setState({ loading: false,
       foundAlbuns: results,
       artistSearch: inputSearch,
       inputSearch: '',
       notFound: albumNotFound });
   });
 }

 render() {
   const {
     inputSearch,
     disableButton, foundAlbuns, loading, notFound, artistSearch } = this.state;
   return (
     <div data-testid="page-search">
       <Header page="/search" />
       <div className="form-content">
         <form className="search-form" action="">
           <label htmlFor="search-artist-input">
             <input
               name="inputSearch"
               minLength={ 2 }
               value={ inputSearch }
               data-testid="search-artist-input"
               placeholder="Nome do Artista"
               type="text"
               onChange={ this.onInputSearchChange }
             />
             <button
               disabled={ disableButton }
               data-testid="search-artist-button"
               type="submit"
               onClick={ this.fechArtists }
             >
               Procurar

             </button>
           </label>
         </form>
       </div>
       <div>

         {notFound && <h4 className="not-found-album">Nenhum álbum foi encontrado</h4>}
         {foundAlbuns.length > 0
          && (
            <div>
              <h4 className="result-text">
                Resultado de álbuns de:
                {' '}
                {artistSearch}
                {' '}
              </h4>
              <div className="album-results">
                {foundAlbuns.map((album) => (

                  <div className="album-card" key={ album.collectionId }>
                    <Link
                      to={ `album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <img src={ album.artworkUrl100 } alt={ album.colectionName } />
                      <h3>{album.collectionName}</h3>
                      <span>{album.artistName}</span>
                    </Link>
                  </div>

                ))}
              </div>

            </div>
          ) }

       </div>
       <section>
         {loading && <Loading />}
       </section>
     </div>
   );
 }
}
export default Search;
