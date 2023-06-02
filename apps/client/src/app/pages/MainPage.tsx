// The purpose of this component is to serve as the main page of a movie search application. 
// It sets up the Algolia search functionality, provides the movie creation form, displays the search box, allows adding new movies, 
// and shows the search results using the MovieResultsHits component.


import { InstantSearch, Configure } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import MovieResultsHits from '../components/MovieSearchResults/MovieSearchResults';
import SearchBox from '../components/SearchBox/SearchBox';
import { config } from '../config/config';
import { createMovie } from '../api/api.client';
import MovieEditForm from '../components/MovieEditForm/MovieEditForm';
import { Movie } from '@types';
import genericStyles from '../generic-styles.module.scss';

const searchClient = algoliasearch(config.algolia.appId, config.algolia.apiKey);
const MainPage = (props: any) => {
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false); //It is used to control the visibility of the movie creation form.
// An empty movie object, emptyMovie, is defined with default property values.

  const emptyMovie: Movie = {
    _id: '',
    objectID: '',
    title: '',
    year: 0,
    score: 0,
    rating: 0,
    color: '#fff',
    alternative_titles: [],
    image: '',
    actors: [],
    genre: [],
    actor_facets: [],
  };

  return (
    // The component creates an instance of the Algolia search client using the algoliasearch library and the Algolia credentials from the configuration file.

    // The component renders an InstantSearch component from the react-instantsearch-dom library. 
    // It configures the search client, index name, search state, URL creation function, and search state change handler.
    <InstantSearch
      searchClient={searchClient}
      indexName={config.algolia.moviesIndex}
      searchState={props.searchState}
      createURL={props.createURL}
      onSearchStateChange={props.onSearchStateChange}
    >
      {/* The Configure component from react-instantsearch-dom is used to set the number of hits per page to 30. */}
      <Configure hitsPerPage={30} />

      {/* The MovieEditForm component is rendered. It represents the form for creating a new movie. It receives the createFormIsVisible state,
       emptyMovie as the movie object, the setVisible function to control the visibility of the form, and the createMovie function as props. */}

      <MovieEditForm
        visible={createFormIsVisible}
        movie={emptyMovie}
        setVisible={setCreateFormIsVisible}
        submitForm={createMovie}
      />
      
      <section>
      {/* Inside the section element, the SearchBox component is rendered. It provides the search functionality for the movie search application. */}
        <SearchBox />
        <button
          className={genericStyles.button}
          onClick={() => setCreateFormIsVisible(true)}  
        >
          Add movie
        </button>
        <MovieResultsHits /> 
        {/* //The MovieResultsHits component is rendered. It represents the component responsible for displaying the search results of movies. */}
      </section>
    </InstantSearch>
    // The MainPage component returns the InstantSearch component as the root element, with all the necessary configurations and nested components.
  );
};

export default MainPage;
