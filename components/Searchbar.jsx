// import { useState } from 'react';
// import styles from '../styles/SearchBar.module.css';


// const SearchBar = () => {
//   const [searchValue, setSearchValue] = useState('');

//   const handleInputChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Do something with the search value
//     console.log(searchValue);
//   };

//   return (
//     <form className={styles.searchBar} onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchValue}
//         onChange={handleInputChange}
//         className={styles.searchInput}
//       />
//       <button type="submit" className={styles.searchButton}>
//         Search
//       </button>
//     </form>
//   );
// };

// export default SearchBar;

import { useState } from 'react';
import styles from '../styles/SearchBar.module.css';


const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass searchValue to the parent component
    onSearch(searchValue);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;

