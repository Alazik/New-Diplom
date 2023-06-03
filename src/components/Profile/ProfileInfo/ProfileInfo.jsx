import React, { useState } from "react";
import Preloader from "../../common/Preloader/Loader";
import s from "./ProfileInfo.module.css";
import { useEffect } from 'react';
// import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm";
import { useTranslation } from "react-i18next";

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files[0]) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData);
    setEditMode(false);
  };

  return (
    <div className={s.profileInfo}>
      <img
        className={s.wallpaper}
        src="https://wallpapercave.com/wp/wp8695009.jpg"
        alt="wallpaper"
      />
      <div className={s.descriptionBlock}>
        <img
          alt=""
          src={profile.photos.large || userPhoto}
          className={s.mainPhoto}
        />
        {isOwner && (
          <input
            className={s.changePhoto}
            type={"file"}
            onChange={onMainPhotoSelected}
          ></input>
        )}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        {editMode ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}
      </div>
    </div>
  );
};

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const ProfileData = ({ profile, isOwner, goToEditMode }) => {

  const {t ,i18n} = useTranslation();

  useEffect(() => {
      const lng = localStorage.getItem('lg')
      i18n.changeLanguage(lng);
  }, [])

  const lng = navigator.language;

  return (
    <div className={s.profileData}>
      <div className={s.name}>{profile.fullName}</div>
      <div className={s.spanInfo}>{t('ProfileDataForm.baseInfo')}</div>
      <div style={{marginBottom: "30px"}}>
        <b>{t('ProfileDataForm.lookingJob')}</b> {profile.lookingForAJob ? "+" : "-"}
      </div>
      {profile.lookingForAJob && (
        <div style={{marginBottom: "30px"}}>
          <b>{t('ProfileDataForm.skill')} </b> {profile.lookingForAJobDescription}
        </div>
      )}
      <div style={{marginBottom: "15px"}}>
        <b>{t('ProfileDataForm.aboutMe')} </b> {profile.aboutMe}
      </div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode} className={s.Btn}>
            {t('changeYesNo.change')}
            <svg className={s.svg} viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
