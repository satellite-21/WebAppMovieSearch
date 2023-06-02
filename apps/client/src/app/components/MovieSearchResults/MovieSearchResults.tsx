// The purpose of this component is to display the search results for movies. 
// It allows the user to edit or delete each movie, and it provides functionality to update the movies by making API calls. 
// The component also handles the visibility of the movie edit form.


import styles from './MovieSearchResults.module.scss';
import { Movie } from '@types';
import { connectHits } from 'react-instantsearch-dom';
import { Hit } from 'react-instantsearch-core';
import MovieBox from '../MovieBox/MovieBox';
import MovieEditForm from '../MovieEditForm/MovieEditForm';
import { useEffect, useState } from 'react';
import { updateMovie, deleteMovie } from '../../api/api.client';
import { showNotification } from '../../misc/showNotification';

// The SearchResults component receives a prop called hits, which is an array of movie search results.
const SearchResults = ({ hits }: { hits: Hit<Movie>[] }) => {
  const [editFormIsVisible, setEditFormIsVisible] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState({} as Movie);
  const [movies, setMovies] = useState([] as Movie[]);


  // The handleDeleteMovie function is responsible for deleting a movie. 
  // It calls the deleteMovie API function to delete the movie with the specified ID. If the deletion is successful,
  //  it updates the movies state by removing the deleted movie from the array. If there is an error, it displays a notification.
  const handleDeleteMovie = (id: string) => {
    deleteMovie(id)
      .then((res) => {
        if (res.status < 400) {
          const index = movies.findIndex((item) => item._id === id);
          const moviesCopy = [...movies];
          moviesCopy.splice(index, 1);
          setMovies(moviesCopy);
        }
        return res;
      })
      .catch((err) => {
        showNotification('danger', err?.message);
      });
  };

  // The handleUpdateMovie function is responsible for updating a movie. 
  // It calls the updateMovie API function to update the movie with the specified ID. 
  // If the update is successful, it updates the movies state by replacing the old movie with the updated movie in the array. 
  // If there is an error, it displays a notification.
  const handleUpdateMovie = (updatedMovie: Movie, id: string) => {
    return updateMovie(updatedMovie, id).then((res) => {
      if (res.status < 400) {
        const index = movies.findIndex((item) => item._id === id);
        const moviesCopy = [...movies];
        moviesCopy[index] = updatedMovie;
        setMovies(moviesCopy);
      }
      return res;
    });
  };
// The useEffect hook is used to update the movies state whenever the hits prop changes. It sets the movies state to the new array of search results.
  useEffect(() => {
    setMovies(hits);
  }, [hits]);


  // The component renders a MovieEditForm component, 
  // which is responsible for editing a movie. 
  // It passes the editFormIsVisible, setEditFormIsVisible, selectedMovie, and handleUpdateMovie 
  // functions as props to the MovieEditForm
  return (
    <div className={styles.movieSearchResultsContainer}>
      <MovieEditForm
        visible={editFormIsVisible}
        setVisible={setEditFormIsVisible}
        movie={selectedMovie}
        submitForm={handleUpdateMovie}
      />
{/* 
The component then checks if there are any movies in the movies array. 
If there are movies, it maps through the array and renders a MovieBox component for each movie. It passes the movie object,
 setSelectedMovie, setEditFormIsVisible, and handleDeleteMovie functions as props to each MovieBox. */}
      {movies.length ? (
        movies.map((movie) => (
          <MovieBox
            key={movie.objectID}
            movie={movie}
            setSelectedMovie={setSelectedMovie}
            setVisible={setEditFormIsVisible}
            handleDeleteMovie={handleDeleteMovie}
          />
        ))
      ) : (
        <h1>No results found</h1> 
        // If there are no movies in the movies array, it displays a "No results found" message.
      )}
    </div>
  );
};

const MovieResultsHits = connectHits(SearchResults);

export default MovieResultsHits;
