import React, { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import s from "./AddMessageForm.module.css";
import { sendMessage } from "../../redux/chat-reducer";
import { useTranslation } from "react-i18next";

export const AddMessageForm: React.FC<{}> = React.memo(() => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const status = useSelector((state: any) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    //@ts-ignore
    dispatch(sendMessage(message));
    setMessage("");
  };

  const {t, i18n} = useTranslation();

  useEffect(() => {
      const lng = navigator.language;
      i18n.changeLanguage(lng);
  }, [])

  const lng = navigator.language;

  return (
    <div className={s.sendDiv}>
      <button
        className={s.sendButton}
        disabled={status !== "ready"}
        onClick={sendMessageHandler}
      >
        {t('myPosts.send')}
      </button>

      <textarea
        className={s.messageText}
        onChange={(e) => setMessage(e.currentTarget.value)}
        value={message}
      ></textarea>
    </div>
  );
});
