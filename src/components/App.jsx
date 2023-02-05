import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from 'react-loader-spinner';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setLoading(true);

    getImages(searchQuery, page)
      .then(data => {
        if (!data.totalHits) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setImages(prevImages =>
          page === 1 ? data.hits : [...prevImages, ...data.hits]
        );
        setTotalHits(data.totalHits);
        setLoading(false);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const totalPages = totalHits / 12;

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setTotalHits(null);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <p>{error.message}</p>}
      {loading && <InfinitySpin width="200" color="#3f51b5" />}
      {images && <ImageGallery imagesArr={images} />}
      {page <= totalPages && (
        <Button onClick={() => setPage(page => page + 1)} />
      )}
      <ToastContainer />
    </div>
  );
};
