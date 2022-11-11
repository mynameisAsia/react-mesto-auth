import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({title, card, link, likesCount, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `button_theme_like ${isLiked ? 'button_active' : ''}`;
 
    function handleClick() {
        onCardClick(card);
    } 

    function handleCardLike() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
        <li className="photos__card">
            <img src={link} alt={title} className="photos__item" style={{ backgroundImage: `url(${link})` }} onClick={handleClick} />
            {isOwn && (<button type="button" className="button_theme_delete" onClick={handleCardDelete}></button>)}
            <div className="photos__info">
                <h3 className="photos__title">{title}</h3>
                <div className="photos__like-container">
                    <button className={cardLikeButtonClassName} aria-label="Лайк" onClick={handleCardLike}></button>
                    <p className="photos__like-counter">{likesCount}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;