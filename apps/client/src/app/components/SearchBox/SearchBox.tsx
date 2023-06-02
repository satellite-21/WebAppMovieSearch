// It imports the connectSearchBox function from the 
// 'react-instantsearch-dom' package. 
// This function is used to connect the search box component to the Algolia search engine.

import { connectSearchBox } from "react-instantsearch-dom";


import styles from "./SearchBox.module.scss";
import genericStyles from "../../generic-styles.module.scss";

// It imports the FaSearch component from the 'react-icons/fa' package.
//  This component represents an icon for the search functionality.
import { FaSearch } from "react-icons/fa";

// Here we define the SearchBox component.
const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <div className={styles.searchBoxContainer}>
    <FaSearch className={styles.searchIcon} />
    <input
      type="text"
      value={currentRefinement}
      onChange={(e) => refine(e.target.value)}
      className={genericStyles.inputBar}
      placeholder="Search for movies"
    />
  </div>
));

export default SearchBox;
  