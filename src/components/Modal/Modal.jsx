import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({onClose, children}) {
  useEffect()

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

 const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

    return createPortal(
      <div className={css.overlay} onClick={handleOverlayClick} >
        <div className={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }


Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
};


// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleOverlayClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.overlay} onClick={this.handleOverlayClick}>
//         <div className={css.modal}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   onClose: PropTypes.func,
//   children: PropTypes.element,
// };
