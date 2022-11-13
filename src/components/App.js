import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import * as auth from "../utils/auth";
import InfoTooltip from './InfoTooltip';

function App() {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [selectedCard, setSelectedCard] = useState({
        name: '',
        link: '',
    });
    const [deletedCard, setDeletedCard] = useState({
        name: '', 
        link: '',
    })

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopup, setIsImagePopup] = React.useState(false);
    const [isDeletePopup, setIsDeletePopup] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [isAuthSucceed, setIsAuthSucceed] = React.useState(false);
    const [isMobileHeaderOpen, setIsMobileHeaderOpen] = React.useState(false);

    useEffect(() => {
        if (loggedIn) {
            api.getUserInfo()
                .then((res) => {
                    setCurrentUser(res);
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn])
    
    useEffect(() => {
        if (loggedIn) {
            api.getInitialCards()
                .then((res) => {
                    setCards(res)
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn])

    function handleRegister({email, password}) {
        auth.register(email, password)
            .then((res) => { 
                if (res) {
                    setIsAuthSucceed(true);
                    navigate('/sign-in')
                }
            })
            .catch((err) => {
                console.log(err);
                setIsAuthSucceed(false);
            })
            .finally(
                setIsInfoToolTipOpen(true)
            )
    }

    function handleLogin({email, password}) {
        auth.login(email, password)
            .then((res) => {
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', res.token)
                    setEmail(email);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
                setIsAuthSucceed(false);
                setIsInfoToolTipOpen(true);
            })
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.tokenCheck(jwt)
                .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setEmail(res.data.email);
                    navigate('/')
                }
                })
                .catch((err) => console.log(err))
        }
    }, [navigate]);

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        setEmail('');
        setIsBurgerClicked(false);
    }

    function handleInfoToolTipClose() {
        setIsInfoToolTipOpen(false);
        if (isAuthSucceed) {
            navigate('/sign-in')
        }
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setIsImagePopup(true);
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopup(false);
        setSelectedCard({});        
        setIsDeletePopup(false);
        setDeletedCard({});
    }

    function handleUpdateUser(name, about) {
        setIsLoading(true);
        api.updateUserInfo(name, about)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleUpdateAvatar(avatar) {
        setIsLoading(true);
        api.changeAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleAddPlaceSubmit(name, link) {
        setIsLoading(true);
        api.addNewCard(name, link)
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }
    
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        isLiked
        ? api.removeLike(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err))
        : api.likeCards(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err))
    }

    function handleDeleteClick(card) {
        setIsDeletePopup(true);
        setDeletedCard(card)
    }
    
    function handleCardDelete(card) {
        setIsLoading(true);
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((currentCard) => currentCard._id !== card._id && currentCard));
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(
                setIsLoading(false)
            )
    }

    const [isBurgerClicked, setIsBurgerClicked] = React.useState(false);

    function handleClickBurgerMenu() {
        if (loggedIn) {
            setIsBurgerClicked(!isBurgerClicked);
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header 
                    loggedIn={loggedIn} 
                    email={email}
                    onLogout={handleLogout}
                    isBurgerClicked={isBurgerClicked}
                    openMobileMenu={handleClickBurgerMenu}
                />
                <Routes>
                    <Route
                        exact path='/'
                        element={
                            <ProtectedRoute
                                path='/'
                                loggedIn={loggedIn} 
                                component={Main}
                                cards={cards}
                                onEditProfile={handleEditProfileClick} 
                                onAddPlace={handleAddPlaceClick} 
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick} 
                                onCardLike={handleCardLike}
                                onCardDelete={handleDeleteClick}
                            />
                        }
                    />
                    <Route path='/sign-up' element={
                        <Register onRegister={handleRegister} />
                    }></Route>
                    <Route path='/sign-in' element={
                        <Login onLogin={handleLogin} />
                    }></Route>
                    <Route 
                        path="*"
                        element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}>
                    </Route>
                </Routes>
                <InfoTooltip isSuccess={isAuthSucceed} isOpen={isInfoToolTipOpen} onClose={handleInfoToolTipClose} />
                <EditProfilePopup 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateUser={handleUpdateUser} 
                    isLoading={isLoading} 
                    loadingText="Сохранение..." 
                />
                <AddPlacePopup 
                    isOpen={isAddPlacePopupOpen} 
                    onClose={closeAllPopups} 
                    onAddPlace={handleAddPlaceSubmit} 
                    isLoading={isLoading} 
                    loadingText="Сохранение..." 
                />
                <EditAvatarPopup 
                    isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateAvatar={handleUpdateAvatar} 
                    isLoading={isLoading} 
                    loadingText="Сохранение..." 
                />
                <DeleteCardPopup 
                    card={deletedCard} 
                    isOpen={isDeletePopup} 
                    onClose={closeAllPopups} 
                    onDeleteCard={handleCardDelete} 
                    isLoading={isLoading} 
                    loadingText="Сохранение..." 
                />
                <ImagePopup 
                    onClose={closeAllPopups} 
                    card={selectedCard} 
                    isOpen={isImagePopup} 
                />
                <Footer />
            </div>
        </CurrentUserContext.Provider>
        
    );
}

export default App;
