import React, {useContext, useEffect} from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/context";


const Profile = (props) => {
  const {i18n} = useTranslation();
  const{loginPostData, myId} = useContext(AppContext)

    useEffect(() => {
        if (props.isOwner) {
          loginPostData(myId, true)
        }
        else{
          loginPostData(myId, false)
        }
        const lng = localStorage.getItem('lg')
        i18n.changeLanguage(lng);
    }, [])

  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        saveProfile={props.saveProfile}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
  }

export default Profile;
