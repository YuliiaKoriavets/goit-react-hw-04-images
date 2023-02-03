import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    totalHits: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      getImages(this.state.searchQuery, this.state.page)
      .then(data =>
        this.setState({
          images: data.hits,
          totalHits: data.totalHits,
        })
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
    }
  }

  handleButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
      totalHits: null,
    });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          page={this.state.page}
        />
        <Button onClick={this.handleButtonClick} />
        <ToastContainer />
      </div>
    );
  }
}
