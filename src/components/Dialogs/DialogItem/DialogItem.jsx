import React from "react";
import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog}>
            <img alt="" className={s.avatar} src="https://ponylogisticsexpress.com/sites/default/files/styles/mt_testimonial/public/2019-07/mt-testimonial-1.jpg?h=87136cbf&itok=NVGXzeKZ"/>
            <NavLink to={path} className={activeClass => activeClass.isActive ? s.active : s.dialog}>{props.name}</NavLink>
        </div>
    );
};

export default DialogItem;