import React from "react";
import loader from "../../../assets/images/loader.png"
import s from "./Loader.module.css";

let Preloader = () => {
    return <div className={s.wrapper}>
    <div className={s.circle}></div>
    <div className={s.circle}></div>
    <div className={s.circle}></div>
    <div className={s.shadow}></div>
    <div className={s.shadow}></div>
    <div className={s.shadow}></div>
</div>
}

export default Preloader;