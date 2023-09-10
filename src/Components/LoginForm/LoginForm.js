import React, { useEffect, useState } from 'react';
import style from './LoginForm.module.css'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [showRegisterLink, setShowRegisterLink] = useState(false);

    useEffect(() => {
        const storedRememberMe = localStorage.getItem('rememberMe');
        if (storedRememberMe === 'true') {
            const storedEmail = localStorage.getItem('email')||'';
            const storedPassword = localStorage.getItem('password')||'';
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async () => {
        try {  
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                if (rememberMe) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                }
                localStorage.setItem('rememberMe', rememberMe.toString())
                window.location.href = '/home';
            } else {
                setError('Помилка входу.Перевірте дані.');
                if (response.status === 404) {
                    setShowRegisterLink(true);
                }
            }
        } catch (error) {
            console.error('Помилка входу:', error)
        }
    };

    useEffect(() => {
        if (!rememberMe) {
            setEmail('');
            setPassword('');
        }
    }, [rememberMe]);

    return (
        <div>
            {error && <p className={style.error}>{error}</p>}
            <form className={style.form}>
                <input
                    type="email"
                    placeholder="Електронна пошта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {showRegisterLink && (
                    <p>
                        не зареєстровані? <a href="/registration">Зареєструватися</a>
                    </p>
                )}
                <label>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    Запам'ятати мене
                </label>
                <button onClick={handleLogin}>Увійти</button>
            </form>
        </div>
    );
};

export default LoginForm;