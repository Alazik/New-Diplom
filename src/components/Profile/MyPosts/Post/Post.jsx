import React, {useState, useEffect} from "react";
import s from "./Post.module.css";
import { useStore } from "react-redux";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../firebase";

const Post = (props) => {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    
    if (props.image) {
      const starsRef = ref(storage, 'posts/' + props.image)
    getDownloadURL(starsRef).then((urll) => {
      setUrl(urll)
      console.log(props.image)
      // console.log(props.createdAt.toLocaleDateString())
    })
    }
  }, [])
  
  return (
    <div className={s.post}>
      <div className={s.nick}>{props.nick ? props.nick: false}</div>
      <div>{props.createdAt}</div>
      <div className={s.item}>
        {props.avatar ? <img
        alt=""
        src={props.avatar}
      /> : <img
      alt=""
      src="https://w7.pngwing.com/pngs/911/1005/png-transparent-ninja-computer-icons-avatar-samurai-ninja-cartoon-desktop-wallpaper-mix.png"/>}
      
      
      <div className={s.message}>{props.message}</div>
    </div>
    <img style={{height: '300px'}}
        alt=""
        src={url}
      />
    </div>
  );
};

export default Post;
