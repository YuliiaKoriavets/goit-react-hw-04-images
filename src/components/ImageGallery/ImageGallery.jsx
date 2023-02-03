import { Component } from 'react';
import { getImages } from 'services/api';
import css from './ImageGallery.module.css';
import { InfinitySpin } from 'react-loader-spinner'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevStates) {
    const { searchQuery, page } = this.props
    const prevQuery = prevProps.searchQuery
    const prevPage = prevProps.page
    const currentQuery = searchQuery

    if (prevQuery !== currentQuery || prevPage !== page) {
      this.setState({ loading: true, images: [] });

      getImages(searchQuery, page)
        .then(data => this.setState({ images: data.hits }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (this.state.images &&
      <ul className={css.image__gallery}>
        {this.state.error && <p>{this.state.error.message}</p>}
        {this.state.loading && <InfinitySpin
          width='200'
          color="#3f51b5"
        />}
        {this.state.images.map(({ id, tags, webformatURL, largeImageURL }) => <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />)
        }
      </ul>
    );
  }
}
