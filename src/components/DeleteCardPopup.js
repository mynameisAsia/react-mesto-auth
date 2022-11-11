import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ card, isOpen, onClose, onDeleteCard, isLoading, loadingText}) {
    function handleSubmit(e) {
        e.preventDefault();

        onDeleteCard(card);
    }

    return (
        <PopupWithForm isOpen={isOpen} name="confirm" title="Вы уверены?" textButton="Да" onClose={onClose} isLoading={isLoading} 
        loadingText={loadingText} onSubmit={handleSubmit} />
    )
}

export default DeleteCardPopup;