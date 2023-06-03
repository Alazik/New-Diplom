import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chat-reducer";
import { compose } from "redux";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { AddMessageForm } from "./AddMessageForm";
import { Messages } from "./Messages";
import { useTranslation } from "react-i18next";

const ChatPage: React.FC = React.memo(() => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lng = localStorage.getItem("lg");
    i18n.changeLanguage(lng);
  }, []);
  return (
    <div>
      <Chat />
    </div>
  );
});

const Chat: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const status = useSelector((state: any) => state.chat.status);

  useEffect(() => {
    //@ts-ignore
    dispatch(startMessagesListening());
    return () => {
      //@ts-ignore
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" ? (
        <div>Some error occured, please refresh the page</div>
      ) : (
        <>
          <Messages />
          <AddMessageForm />
        </>
      )}
    </div>
  );
});

export default compose(withAuthNavigate)(ChatPage);
