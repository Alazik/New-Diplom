import React from "react";
import { useEffect } from 'react';
import {Input, createField} from "../../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";
import s from "./ProfileDataForm.module.css"
import { useTranslation } from "react-i18next";

const ProfileDataForm = ({handleSubmit, profile}) => {

  const {t ,i18n} = useTranslation();

  useEffect(() => {
      const lng = localStorage.getItem('lg')
      i18n.changeLanguage(lng);
  }, [])

  const lng = navigator.language;

  return (
    <form className={s.formSave} onSubmit={handleSubmit}>
      <div className={s.spanInfo}>{t('ProfileDataForm.baseInfo')}</div>
      <div style={{marginBottom: "30px"}}>
        <b>{t('ProfileDataForm.fio')}</b> {createField("ФИО", "fullName", [], Input)}
      </div>
      <div style={{marginBottom: "30px"}}>
        <b>{t('ProfileDataForm.lookingJob')}</b> {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>
      <div style={{marginBottom: "30px"}}>
        <b>{t('ProfileDataForm.skill')}</b>
        {createField("Мои профессиональные навыки", "lookingForAJobDescription", [], Input)}
      </div>
      <div style={{marginBottom: "15px"}}>
        <b>{t('ProfileDataForm.aboutMe')} </b>
        {createField("Обо мне", "aboutMe", [], Input)}
      </div>
      <div>
        <button className={s.button2}>{t('ProfileDataForm.save')}</button>
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm);

export default ProfileDataFormReduxForm;
