import React from "react";
import { useEffect } from 'react';
import s from "./Header.module.css"; //css-module
import { NavLink } from "react-router-dom";
import logo from "./QBlack.jpg"
import { useTranslation } from "react-i18next";

const Header = ({isAuth, login, logout, props}) => {

    const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;

    return (
        <header className={s.header}>
            <div className={s.qb}>
            <img className={s.iconqb} src={logo} alt=""/>
            <span className={s.logoqb}>QazBook</span>
            </div>
            
            <div className={s.loginBlock}>
                {isAuth 
                ? <div>{login} <button onClick={logout} className={s.exit}>{t('header.logout')}</button></div> 
                : <div><NavLink className={s.login} to={'/login'}>{t('header.login')} | </NavLink> <a className={s.reg} href="https://social-network.samuraijs.com/signUp" target="_blank">{t('header.registration')}</a></div>}
            </div>
        </header>
    );
};

export default Header;