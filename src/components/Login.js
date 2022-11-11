import React from 'react';

function Login({ onLogin }) {
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

        if (!data.password || !data.email) {
            return;
        }

        onLogin(data)
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2 className='auth-form__title'>Вход</h2>
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
            <button className='button button_theme_auth' type='submit'>Войти</button>
        </form>
    )
}

export default Login;