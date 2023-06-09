import React, { useContext, useState } from "react";
import { useEffect } from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
import { useTranslation } from "react-i18next";
import { collection, addDoc } from "firebase/firestore";
import { database, storage } from "../../../firebase";
import { AuthAPI, profileAPI } from "../../../api/api";
import { AppContext } from "../../context/context";
import { ref, uploadBytes } from "firebase/storage";

let maxLength10 = maxLengthCreator(50);

const MyPosts = React.memo((props) => {
  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));
  const { posts, setPosts, myId } = useContext(AppContext);
  // const [posts, setPosts] = useState(null)

  const [value, setValue] = useState("");

  // let newPostElement = React.createRef();

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = localStorage.getItem("lg");
    i18n.changeLanguage(lng);
    posts.filter((p) => {
      console.log(p?.image)
    })
  }, [posts]);

  const lng = navigator.language;

  return (
    <div className={s.postBlock}>
      <h3 className={s.textPost}>{t("myPosts.createPost")}</h3>
      {/* <AddNewPostFormRedux onSubmit={onAddPost}/> */}
      <AddNewPostFormSultan id={myId} value={value} setValue={setValue} />
      {posts ? (
        <div className={s.posts}>
          {posts.map((p) => (
            <Post key={p.userId} message={p.message} createdAt={p?.createdAt} nick={p?.nick} avatar={p?.avatar} image={p?.image} likesCount={"100"} />
          ))}
        </div>
      ) : (
        false
      )}
    </div>
  );
});

const AddNewPostForm = ({ props }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
    
  }, []);


  return (
    <form className={s.postForm} onSubmit={props.handleSubmit}>
      <div>
        <Field
          className={s.textareaPost}
          name="newPostText"
          component={Textarea}
          placeholder={t("myPosts.createPost")}
        />
      </div>
      <div>
        <button className={s.buttonPost}>{t("myPosts.send")}</button>
      </div>
    </form>
  );
};

const AddNewPostFormSultan = ({ id, value, setValue }) => {
  // const[post, setPost] = useState('')
  const { t, i18n } = useTranslation();
  const [photo1, setPhoto] = useState(null)
  const {photo, nick} = useContext(AppContext)

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);

  const lng = navigator.language;
  const sendPost = async() => {
    try {
      const name = new Date().toString() + "post"
      
      const response = await fetch(photo1)
      const blob = await response.blob()

      let storageRef = ref(storage, "posts/" + name)

      uploadBytes(storageRef, blob).then(() => {
        addDoc(collection(database, "posts"), {
          nick: nick,
          avatar: photo,
          userId: id,
          message: value,
          createdAt: new Date().toLocaleString(),
          image: name
        });
      })
      setValue('')
      setPhoto(null)
    } catch (error) {
      console.log(error);
    }
  };

  const onMainPhotoSelected = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0].file)
      console.log(e.target.files[0].file)
    }
  };

  const showFile = async (e) => { 

    e.preventDefault() 

    const reader = new FileReader() 

    reader.onload = async (e) => { 

      const text = (e.target.result) 

       console.log(text) 
       setPhoto(text)


    }; 

    
    reader.readAsDataURL(e.target.files[0])

 }

  return (
    <div>
      <form className={s.postForm}>
        <div>
          {photo1 ? <img className={s.postimg} src={photo1} alt=""/> : false}
          
          <input
            className={s.textareaPost}
            placeholder={t("myPosts.createPost")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </form>
      <button onClick={sendPost} className={s.buttonPost}>
        {t("myPosts.send")}
      </button>
      <input
        className={s.changePhoto}
        type={"file"}
        onChange={showFile}
      ></input>
    </div>
  );
};

let AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(
  AddNewPostForm
);

export default MyPosts;
