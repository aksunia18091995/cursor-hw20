import React, {useState} from "react"; 
import style from './RegisterForm.module.css'

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateName = (name) => {
        return name.length >= 3;
    }

    const validateSurname = (surname) => {
        return surname.length >= 3;
    }

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (validateEmail(newEmail)) {
            e.target.classList.remove(style.invalid);
            e.target.classList.add(style.valid);
        } else {
            e.target.classList.remove(style.valid);
            e.target.classList.add(style.invalid);
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (validatePassword(newPassword)) {
            e.target.classList.remove(style.invalid);
            e.target.classList.add(style.valid);
        } else {
            e.target.classList.remove(style.valid);
            e.target.classList.add(style.invalid);
        }
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);

        if (validateName(newName)) {
            e.target.classList.remove(style.invalid);
            e.target.classList.add(style.valid);
        } else {
            e.target.classList.remove(style.valid);
            e.target.classList.add(style.invalid);
        }
    };

    const handleSurnameChange = (e) => {
        const newSurname = e.target.value;
        setSurname(newSurname);

        if (validateSurname(newSurname)) {
            e.target.classList.remove(style.invalid);
            e.target.classList.add(style.valid);
        } else {
            e.target.classList.remove(style.valid);
            e.target.classList.add(style.invalid);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            let hasError = false;

            if (!validateName(name)) {
                setError('Ім\'я має містити принаймні 3 символи');
                hasError = true;
                }

            if (!validateSurname(surname)) {
                setError('Прізвище має містити принаймні 3 символи');
                hasError = true;
            }

            if (password !== confirmPassword) {
                setError('Паролі не співпадають');
                hasError = true;
            }

            if (!validateEmail(email)) {
                setError('Недійсна адреса електронної пошти');
                hasError = true;
            }
            
            if (!validatePassword(password)) {
                setError('Пароль повинен містити мінімум 8 символів');
                hasError = true;
            }

            if (hasError) {
                return;
            } 
 
            const response = await fetch('/api/register', {
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
                }
                window.location.href = '/login';
            } else {
                setError('Помилка реєстрації. Перевірте дпні.');
            }

            
        } catch (error) {
            console.error('Помилка реєстрації:', error);
        }
    };

    return (
        <div>
            {error && <p className={style.error}>{error}</p>}
            <form className={style.form}>
                <input
                    type="text"
                    placeholder="Iм'я"
                    value={name}
                    onChange={handleNameChange}
                    className={style.inputField}
                />
                <input
                    type="text"
                    placeholder="Прізвище"
                    value={surname}
                    onChange={handleSurnameChange}
                    className={style.inputField}
                />
                <input
                    type="email"
                    placeholder="Електронна пошта"
                    value={email}
                    onChange={handleEmailChange}
                    className={style.inputField}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={handlePasswordChange}
                    className={style.inputField}
                />
                <input
                    type="password"
                    placeholder="Підтвердіть пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={style.inputField}
                />
                <label className={style.label}>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Запам'ятати мене
                </label>
                <button onClick={handleRegister}>Зареєструватися</button>
            </form>
        </div>
    );
};

export default RegisterForm;