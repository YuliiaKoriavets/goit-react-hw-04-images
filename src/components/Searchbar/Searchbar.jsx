import { useState } from 'react';
import { toast } from 'react-toastify';
import { RxMagnifyingGlass } from 'react-icons/rx';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warning('Please enter a search query.');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
    event.target.reset();
  };

  return (
    <header className={css.search__bar}>
      <form className={css.search__form} onSubmit={handleSubmit}>
        <button type="submit" className={css.search__form__button}>
          <RxMagnifyingGlass style={{ width: 25, height: 25 }} />
        </button>

        <input
          className={css.search__form__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
