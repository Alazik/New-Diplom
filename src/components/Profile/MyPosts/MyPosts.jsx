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
import {
  collection,
  addDoc
} from "firebase/firestore";
import { database } from "../../../firebase";
import { AuthAPI } from "../../../api/api";
import { AppContext } from "../../context/context";

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
            <Post key={p.userId} message={p.message} likesCount={"100"} />
          ))}
        </div>
      ) : (
        false
      )}
    </div>
  );
});

const AddNewPostForm = (props) => {
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

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);

  const lng = navigator.language;
  const sendPost = () => {
    try {
      addDoc(collection(database, "posts"), {
        userId: id,
        message: value,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className={s.postForm}>
        <div>
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
    </div>
  );
};

let AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(
  AddNewPostForm
);

export default MyPosts;
