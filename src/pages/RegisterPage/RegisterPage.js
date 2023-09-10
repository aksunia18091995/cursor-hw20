import React from "react";
import style from './RegisterPage.module.css'
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import padlock from "../../image/padlock.png"

function RegisterPage() {
    return (
        <div className={style.container}>
            <img src={padlock} alt="padlock" className={style.padlock}></img>
            <h2 className={style.head}>Реєстрація</h2>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;