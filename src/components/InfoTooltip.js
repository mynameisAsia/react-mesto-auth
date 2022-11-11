import React from "react";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
    return (
        <div className={`popup popup_theme_infotip ${isOpen ? 'popup_opened' : ''}`}>
                <div className="popup__overlay"></div>
                <div className="popup__content">
                    <div className={`popup__status ${isSuccess ? 'popup__status_ok' : 'popup__status_fail' }`} />
                    <h2 className="popup__infotitle">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
                    <button type="button" className="button button_theme_close" aria-label="Закрыть" onClick={onClose}></button>
                </div>
        </div>
    )
}

export default InfoTooltip;