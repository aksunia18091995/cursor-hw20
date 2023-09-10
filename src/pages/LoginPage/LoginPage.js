import React from "react";
import style from './LoginPage.module.css';
import LoginForm from "../../Components/LoginForm/LoginForm";
import padlock from "../../image/padlock.png"

function LoginPage() {
    return (
        <div className={style.container}>
            <img src={padlock} alt="padlock" className={style.padlock}></img>
            <h2 className={style.head}>Вхід</h2>
            <LoginForm />
        </div>
    );
}

export default LoginPage;

