import React from "react";

function MenuBurger({isBurgerClicked, openMobileMenu}) {
    return (
        <div className={`header__burger-menu ${isBurgerClicked && 'header__burger-menu_active' }`} onClick={openMobileMenu}>
            <div className={`header__burger ${isBurgerClicked && 'header__burger_active' }`}></div>
            <div className={`header__burger ${isBurgerClicked && 'header__burger_active' }`}></div>
            <div className={`header__burger ${isBurgerClicked && 'header__burger_active' }`}></div>
        </div>
    )
}

export default MenuBurger;