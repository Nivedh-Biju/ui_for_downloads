import CloseIcon from './../closeIcon';
import './../css/components/modal.css'

function Modal({ show, onClose, description, download_link }) {
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal_description" onClick={onClose}>
        <div className="modal_content_description" onClick={(e) => e.stopPropagation()}>
          <span className="close_description" onClick={onClose}>
            <CloseIcon width={24} height={24} />
          </span>
          <p className='modal_content_description_text'>{description}</p>
          <a  href={download_link}>
            <p className='download_link_modal'>
              Download
            </p>
          </a>
        </div>
      </div>
    );
  }

  export default Modal