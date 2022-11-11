import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup_theme_image ${isOpen ? 'popup_opened' : ''}`}>
                <div className="popup__overlay"></div>
                <div className="popup__image-container">
                    <img src={card.link} alt={card.name} className="popup__image" />
                    <h3 className="popup__image-title">{card.name}</h3>
                    <button type="button" className="button button_theme_close" aria-label="Закрыть" onClick={onClose}></button>
                </div>
        </div>
    )
}

export default ImagePopup;