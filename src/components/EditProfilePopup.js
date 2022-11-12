import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading, loadingText}) {
    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
      }, [currentUser, isOpen]); 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({name, about});
    }

    return (
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen} textButton="Сохранить" isLoading={isLoading} loadingText={loadingText}
            onClose={onClose} 
            onSubmit={handleSubmit}
            children={
            <>
                <input type="text" id="name" name="name" value={name || ''} onChange={handleChangeName} className="popup__input popup__input_type_firstname" placeholder="Имя" minLength="2" maxLength="40" required />
                <span id="name-error" className="error"></span>
                <input type="text" id="about" name="about" value={about || ''} onChange={handleChangeAbout} className="popup__input popup__input_type_job" placeholder="Описание" minLength="2" maxLength="200" required />
                <span id="about-error" className="error"></span>
            </>
            } 
        />
    )
        
}

export default EditProfilePopup;