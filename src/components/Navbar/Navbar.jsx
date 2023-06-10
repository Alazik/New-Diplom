import React, { useContext, useId, useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
import { useTranslation } from "react-i18next";
import logo from "./QBlack.jpg";
import { AuthAPI } from "../../api/api";
import { AppContext } from "../context/context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../firebase";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { posts, setPosts, setMyId, myId, getAuthUserData, loginPostData } =
    useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const uid = await getAuthUserData();
        let q = query(
          collection(database, "posts"),
          where("userId", "==", uid)
        );
        onSnapshot(q, (snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              userId: doc.id,
              message: doc.data().message,
              createdAt: doc.data().createdAt,
            }))
          );
        });
      } catch (error) {}
    })();

    const lng = localStorage.getItem("lg");
    i18n.changeLanguage(lng);
  }, []);

  const lng = navigator.language;

  const refresh = () => {
    window.location.reaload();
  }

  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink
        // onClick={() => loginPostData(123, true)}
        onClick={refresh}
          to="/profile"
          className={(navData) => (navData.isActive ? s.activeLink : s.item)}
        >
          {t("navbar.profile")}
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
        onClick={refresh}
          to="/chat"
          className={(navData) => (navData.isActive ? s.activeLink : s.item)}
        >
          {t("navbar.messages")}
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to="/users"
          className={(navData) => (navData.isActive ? s.activeLink : s.item)}
        >
          {t("navbar.users")}
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to="/settings"
          className={(navData) => (navData.isActive ? s.activeLink : s.item)}
        >
          {t("navbar.settings")}
        </NavLink>
      </div>
      <img className={s.logo} src={logo} alt="" />
    </nav>
  );
};

export default Navbar;
