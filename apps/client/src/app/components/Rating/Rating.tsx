import { FaStar } from 'react-icons/fa';

interface RatingProps {
  stars: number;
}


const Rating = (props: RatingProps) => {

  const stars = Array(props.stars).fill(null).map((_, idx) => <FaStar key={idx} fill='gold' />);
  const emptyStars = Array(5 - props.stars).fill(null).map((_, idx) => <FaStar key={idx + stars.length} fill='grey' />);
  return <div>{[...stars, ...emptyStars]}</div>;

};

export default Rating;

// this component renders a star rating based on the number of stars provided as a prop, 
// The spread operator [...stars, ...emptyStars] is used to merge the two arrays into a single array, which is then rendered within the <div>

//In summary, this code defines a
//  Rating component that renders a star rating based on the stars prop passed to it. 
//  The component generates and displays a series of filled and empty star icons using the 
//  FaStar component from the 'react-icons/fa' package. 
//  The number of filled stars is determined by the props.stars value, 
//  and any remaining stars are rendered as empty stars. 
//  The component encapsulates the logic for generating the star rating and provides a reusable way to display ratings in a React application.
