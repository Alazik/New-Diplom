import React from "react";
import { useEffect,useContext } from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import UsersSearchForm from "./UsersSearchForm";
import Paginator from "./Paginator.jsx";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/context";

let Users = (props) => {
  const{setMyId, setPosts} = useContext(AppContext)
  const {i18n, t} = useTranslation();

    useEffect(() => {
        const lng = localStorage.getItem('lg')
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;

  return (
    <div>
      <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
      <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged} />
      <div className={s.container}>
        {props.users.map((u) => (
          <div className={s.user} key={u.id}>
            <span>
              <div>
                <NavLink onClick={() => {setMyId(u.id); console.log(u.id)}} to={"/profile/" + u.id}>
                  <img
                    className={s.photo}
                    src={u.photos.small != null ? u.photos.small : userPhoto}
                    alt=""
                  />
                </NavLink>
              </div>
            </span>
            <span>
              <span className={s.aboutUser}>
                <div className={s.userName}>{u.name}</div>
                <div className={s.status}>{u.status}</div>
              </span>
              {/* <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
              </span> */}
              <div className={s.flexButton}>
                {u.followed ? (
                  <button
                    disabled={props.followingInProgress.some(
                      (id) => id === u.id
                    )}
                    className={s.unfollow}
                    onClick={() => {
                      props.unfollow(u.id);
                    }}
                  >
                    {t('users.unfollow')}
                  </button>
                ) : (
                  <button
                    disabled={props.followingInProgress.some(
                      (id) => id === u.id
                    )}
                    className={s.follow}
                    onClick={() => {
                      props.follow(u.id);
                    }}
                  >
                    {t('users.follow')}
                  </button>
                )}
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
