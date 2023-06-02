import styles from './MovieBox.module.scss';
import { Hit } from 'react-instantsearch-core';
import Badge from '../Badge/Badge';
import { Movie } from '@types';
import Rating from '../Rating/Rating';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';


// The purpose of this component is to display a box representing a movie. 
// It allows the user to edit or delete the movie and provides information about the movie, 
// such as the title, image, year, score, rating, and genres. The component utilizes various 
// styles and icons to enhance the visual representation of the movie.
interface MovieBoxProps {
  movie: Movie;
  handleDeleteMovie: (id: string) => void;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GenresProps {
  genres: string[];
}

// TODO: get this image from a local file, this is to be loaded when the movie image fails to load 
const fallbackImage =
  'http://www.proedsolutions.com/wp-content/themes/micron/images/placeholders/placeholder_small_dark.jpg';


  // The imageOnErrorHandler function is a callback function that replaces the source of the image with the fallback image when it fails to load.
const imageOnErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event> 
) => {
  event.currentTarget.src = fallbackImage;
};

// GenresContainer component is a functional component that takes an array of genres and renders a container with badges for each genre.

const GenresContainer = ({ genres }: GenresProps) => (
  <div className={styles.genresContainer}>
    {genres.map((genre, idx) => (
      <Badge text={genre} key={idx} />
    ))}
  </div>
);


// The MovieBox component is the main component that renders a box representing a movie

const MovieBox = ({
  movie,
  setSelectedMovie,
  setVisible,
  handleDeleteMovie,
}: MovieBoxProps) => {
  // handleEditClick function that sets the selected movie and makes the edit form visible when the edit icon is clicked.
  const handleEditClick = () => {
    setVisible(true);
    setSelectedMovie({
      _id: movie._id,
      title: movie.title,
      year: movie.year,
      score: movie.score,
      rating: movie.rating,
      color: movie.color,
      alternative_titles: movie.alternative_titles,
      image: movie.image,
      actors: movie.actors,
      genre: movie.genre,
      actor_facets: movie.actor_facets,
    } as Movie);
  };

  // the component renders a div with various elements representing the movie , such as edit and delete icons, movie image, title, year, score, rating, and genres.
  return (
    <div className={styles.movieBox}>
      <FaEdit
        onClick={handleEditClick} //When the edit icon is clicked, it triggers the handleEditClick function to set the selected movie and make the edit form visible.
// When the edit icon is clicked, it triggers the handleEditClick function to set the selected movie and make the edit form visible.
        className={`${styles.editMovieIcon} ${styles.movieIcon}`}
      />

      {/* // TODO: add confirmation dialog when deleting */}
      {/* When the edit icon is clicked, it triggers the handleEditClick function to set the selected movie and make the edit form visible. */}
      <MdOutlineDeleteOutline
        className={`${styles.deleteMovieIcon} ${styles.movieIcon}`}
        onClick={() => handleDeleteMovie(movie._id)}
      />
      {/* When the edit icon is clicked, it triggers the handleEditClick function to set the selected movie and make the edit form visible. */}
      <img
        className={styles.movieImage}
        src={movie.image}
        alt={movie.title}
        onError={imageOnErrorHandler}
      />
      <h5>{movie.title}</h5>
      <span id='movie-year' className={styles.description}>
        Year: {movie.year}
      </span>
      <span id='movie-score' className={styles.description}>
        Score: {Number(movie.score)?.toFixed(2)}
      </span>
      <Rating stars={movie.rating} />
      <GenresContainer genres={movie.genre} />
    </div>
  );
};

export default MovieBox;


