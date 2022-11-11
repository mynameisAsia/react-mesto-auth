import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
        <main className="content">
            <section className="profile">
                <button type="button" className="button button_theme_avatar" onClick={onEditAvatar}></button>
                <img src={currentUser.avatar}  alt="Ава" className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
                <div className="profile__container">
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="button button_theme_edit" aria-label="Редактировать" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="button button_theme_add" aria-label="Добавить" onClick={onAddPlace}></button>
            </section>
            <section className="photos">
                <ul className="photos__list">
                    {cards.map((card) => 
                        (<Card 
                            key={card._id}
                            card={card} 
                            title={card.name} 
                            link={card.link}
                            likesCount={card.likes.length}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />)
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main;