import { Component } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import css from "./App.module.css"
import { Searchbar } from "./Searchbar/Searchbar";
import {ImageGallery} from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    showModal: false,
  }

handleFormSubmit = searchQuery => {
  this.setState({searchQuery})
}

toggleModal =() => {
  this.setState(({showModal}) => ({showModal: !showModal}))
}

  render(){
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} page={this.state.page} onClick={this.toggleModal}/>
        <Button/>

       {this.state.showModal && (<Modal onClose={this.toggleModal}><img src="" alt="" /></Modal>)} 

        <ToastContainer />
      </div>
    );
  }
};
