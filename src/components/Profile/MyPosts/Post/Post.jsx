import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img
        alt=""
        src="https://w7.pngwing.com/pngs/911/1005/png-transparent-ninja-computer-icons-avatar-samurai-ninja-cartoon-desktop-wallpaper-mix.png"
      />
      <div className={s.message}>{props.message}</div>
    </div>
  );
};

export default Post;
