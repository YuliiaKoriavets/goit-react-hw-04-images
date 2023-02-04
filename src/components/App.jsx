import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from 'react-loader-spinner';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    totalHits: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.setState({ loading: true });

      getImages(this.state.searchQuery, this.state.page)
        .then(data => {

          if(!data.totalHits){
            toast.error('Search query not found.');
            return
          }
          this.setState({
            images: [...this.state.images, ...data.hits],
            totalHits: data.totalHits,
            isLoading: false,
          })
        }
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
        {this.state.error && <p>{this.state.error.message}</p>}
        {this.state.loading && <InfinitySpin width="200" color="#3f51b5" />} 
        {this.state.images && <ImageGallery imagesArr={this.state.images} />}
        {this.state.totalHits > 12 && (
          <Button onClick={this.handleButtonClick} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
