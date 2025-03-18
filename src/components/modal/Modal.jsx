import './modal.css'

const Modal = ({children, onClose}) => {
    return <div className="modal-container">
        <div className="modal">
            {children}
            <a className="modal-close" onClick={onClose}></a>
        </div>
        <div className="modal-overlay" onClick={onClose}></div>
    </div>
}

export default Modal