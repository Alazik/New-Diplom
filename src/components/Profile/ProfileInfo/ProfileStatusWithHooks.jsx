import React, { useEffect, useState } from "react";
import s from "./ProfileStatus.module.css";
import { useTranslation } from "react-i18next";

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;

  return (
    <div className={s.status}>
      {!editMode && (
        <div>
          <b>{t('profileStatus.myStatus')}</b>
          <span onDoubleClick={activateEditMode}>
            {props.status || " ---------"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <b>{t('profileStatus.myStatus')}</b>
          <input
            onChange={onStatusChange}
            value={status}
            className={s.inputStatus}
            autoFocus={true}
            onBlur={deactivateEditMode}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
