import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ content, onClose }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeydown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={content} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};