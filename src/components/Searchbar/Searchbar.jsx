import { Component } from 'react';
import { toast } from 'react-toastify';
import { RxMagnifyingGlass } from 'react-icons/rx'
import css from './Searchbar.module.css';


export class Searchbar extends Component {
  state = {
    searchQuery: '',
  }

  handleNameChange = event => {
    this.setState({searchQuery: event.currentTarget.value.toLowerCase()})
  }

  handleSubmit = event => {
    event.preventDefault()

    if(this.state.searchQuery.trim() === ''){
      toast.warning('Please enter a search query.')
      return
    }

    this.props.onSubmit(this.state.searchQuery)
    this.setState({searchQuery: ''})
    event.target.reset()
  }

  render(){
    return (
      <header className={css.search__bar}>
        <form className={css.search__form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.search__form__button}>
            {/* <span className={css.search__form__button__label}>
              Search</span> */}
              <RxMagnifyingGlass style={{width: 25, height: 25}}/>
          </button>
  
          <input
            className={css.search__form__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
