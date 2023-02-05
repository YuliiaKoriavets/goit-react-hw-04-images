import { useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from 'react-loader-spinner';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from 'services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [totalHits, setTotalHits] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    if(searchQuery === ""){
      return
    }
    setLoading(true)

      getImages(searchQuery, page)
        .then(data => {

          if(!data.totalHits){
            toast.error('Sorry, there are no images matching your search query. Please try again.');
            return
          }
          // const totalPages = data.totalHits / 12
          setImages(prevImages => page === 1 ? data.hits : [...prevImages, ...data.hits])
          setTotalHits(data.totalHits)
          setLoading(false)
        }
        )
        .catch(error => setError(error))
        .finally(() => setLoading(false));
  }, [searchQuery, page])

 const handleFormSubmit = query => {
  setSearchQuery(query)
  setImages([])
  setPage(1)
  setTotalHits(null)
  };

    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleFormSubmit} />
        {error && <p>{error.message}</p>}
        {loading && <InfinitySpin width="200" color="#3f51b5" />} 
        {images && <ImageGallery imagesArr={images} />}
        {totalHits > 12 && (
          <Button onClick={()=> setPage(page => page + 1)} />}
        // ) || page >= totalPages && <p>We're sorry, but you've reached the end of search results.</p>}
        <ToastContainer />
      </div>
    );
  }





// export class App extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     totalHits: null,
//     loading: false,
//     error: null,
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       prevState.page !== this.state.page ||
//       prevState.searchQuery !== this.state.searchQuery
//     ) {
//       this.setState({ loading: true });

//       getImages(this.state.searchQuery, this.state.page)
//         .then(data => {

//           if(!data.totalHits){
//             toast.error('Search query not found.');
//             return
//           }
//           this.setState({
//             images: [...this.state.images, ...data.hits],
//             totalHits: data.totalHits,
//             isLoading: false,
//           })
//         }
//         )
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   handleButtonClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleFormSubmit = query => {
//     this.setState({
//       searchQuery: query,
//       images: [],
//       page: 1,
//       totalHits: null,
//     });
//   };

//   render() {
//     const {error, loading, images, totalHits } = this.state
//     return (
//       <div className={css.app}>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {error && <p>{error.message}</p>}
//         {loading && <InfinitySpin width="200" color="#3f51b5" />} 
//         {images && <ImageGallery imagesArr={this.state.images} />}
//         {totalHits > 12 && (
//           <Button onClick={this.handleButtonClick} />
//         )}
//         <ToastContainer />
//       </div>
//     );
//   }
// }
