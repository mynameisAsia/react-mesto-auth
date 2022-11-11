import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading, loadingText}) {
    const avatarRef = React.useRef();
    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
    
        onUpdateAvatar({avatar: avatarRef.current.value});
    }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} textButton="Сохранить" onClose={onClose} onSubmit={handleSubmit} 
            loadingText={loadingText}
            isLoading={isLoading}
            children={
            <>
                <input type="url" id="avatar" name="avatar" className="popup__input popup__input_type_link" placeholder="Ссылка на аватар" ref={avatarRef} required />
                <span id="avatar-error" className="error"></span>
            </>
            } 
        />
    )
}

export default EditAvatarPopup;