import React from "react";
import {Link} from 'react-router-dom';

function MobileHeader({ email, onLogout, isBurgerClicked }) {
    return (
        <div className={`navbar ${isBurgerClicked && 'navbar_active'}`}>
            <p className="navbar__email">{email}</p>
            <Link className="navbar__exit" to="/sign-in" onClick={onLogout}>
                Выйти
            </Link>
        </div>
    )
}

export default MobileHeader;