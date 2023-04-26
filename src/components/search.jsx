import React, { useState } from 'react';

// eslint-disable-next-line react/function-component-definition
const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const onInputChange = (event) => {
    setSearchTerm(event.target.value);
    props.onSearchSelect(event.target.value);
  };

  return (
    <div className="Search">
      <span className="header2">Search </span>
      <input value={searchTerm} onChange={onInputChange} />
    </div>
  );
};

export default Search;
