import React from 'react';
import ReactDOM from 'react-dom';
import "./Model.css"

function Backdrop(props) {
    return (
        <div className="backdrop" onClick={props.onClose} />
    )
}

function ModalOverlay(props) {
    return (
        <div className="modal">
            <div className="content">{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');

function Modal(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </React.Fragment>
    )
}

export default Modal;