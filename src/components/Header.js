import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
import MobileHeader from './MobileHeader';

function Header({ email, onLogout, isBurgerClicked, openMobileMenu }) {
    const location = useLocation();

    return (
        <>
        <MobileHeader 
            email={email}
            onLogout={onLogout}
            isBurgerClicked={isBurgerClicked} 
        />
        <header className="header">
            <img src={headerLogo} alt="Лого" className="header__logo" />
            {location.pathname === "/sign-up" && (
                <Link className="header__menu" to="/sign-in">
                    Войти
                </Link>
            )}
            {location.pathname === "/sign-in" && (
                <Link className="header__menu" to="/sign-up">
                    Регистрация
                </Link>
            )}
            {location.pathname === "/" && (
                <div className="header__container">
                    <p className="header__email">{email}</p>
                    <Link className="header__menu header__menu_out" to="/sign-in" onClick={onLogout}>
                        Выйти
                    </Link>
                    <div className={`header__burger-menu ${isBurgerClicked && 'header__burger-menu_active' }`} onClick={openMobileMenu}>
                        <div className={`header__burger ${isBurgerClicked && 'header__burger_active' }`}></div>
                        <div className={`header__burger ${isBurgerClicked && 'header__burger_active' }`}></div>
                        <div className={`header__burger ${isBurgerClicked && 'header__burger_active' }`}></div>
                    </div>
                </div>
            )}
        </header>
        </>
    )
}

export default Header;