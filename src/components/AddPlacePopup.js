import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading, loadingText}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    React.useEffect(() => {
        setLink('');
        setName('');
      }, [isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({name, link})
    }

    return (
        <PopupWithForm name="add" title="Новое место" isOpen={isOpen} textButton="Создать" onSubmit={handleSubmit} isLoading={isLoading} 
            loadingText={loadingText}
            onClose={onClose}
            children={
            <>
                <input type="text" id="title" name="name" className="popup__input popup__input_type_name" placeholder="Название" value={name || ''} onChange={handleChangeName} minLength="2" maxLength="30" required />
                <span id="title-error" className="error"></span>
                <input type="url" id="link" name="link" className="popup__input popup__input_type_link" placeholder="Ссылка" value={link || ''} onChange={handleChangeLink} required />
                <span id="link-error" className="error"></span>
            </>
            } 
        />
    )
}

export default AddPlacePopup;