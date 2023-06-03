import React from "react";
import { useEffect } from 'react';
import s from "./ProfileStatus.module.css";
import { useTranslation } from "react-i18next";

const ProfileStatus = () => {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    });
  };

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      });
    }
    console.log("componentDidUpdate");
  }

  const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;
  
    return (
      <div>
        {!this.state.editMode && (
          <div>
            {t('profileStatus.myStatus')}
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "---------"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            {t('profileStatus.myStatus')}
            <input
              onChange={this.onStatusChange}
              className={s.inputStatus}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }

export default ProfileStatus;
