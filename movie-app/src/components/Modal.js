import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Modal({ description, onClose }) {
  const divRef = useRef(null);

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="content">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={() => onClose()}
            ></button>{" "}
            <span>بستن</span>
          </div>
          <span>توضیحات</span>
        </div>
        <div className="modal-container">{description}</div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
