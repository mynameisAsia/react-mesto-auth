import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [data, setData] = React.useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData((data) => ({ ...data, [name]: value }));
    }


    function handleSubmit(e) {
        e.preventDefault();
        onRegister(data)
    };

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2 className='auth-form__title'>Регистрация</h2>
            <input 
                className='auth-form__input'
                type='email' 
                name='email'
                placeholder='Email'
                value={data.email}
                onChange={handleChange}
                required
            ></input>
            <input 
                className='auth-form__input'
                type='password' 
                name='password'
                placeholder='Пароль'
                value={data.password}
                onChange={handleChange}
                required
            ></input>
            <button className='button button_theme_auth' type='submit'>Зарегистрироваться</button>
            <Link to='/sign-in' className='auth-form__link'>Уже зарегистрированы? Войти</Link>
        </form>
    )
}

export default Register;