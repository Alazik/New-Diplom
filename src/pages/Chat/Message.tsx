import React from "react";
import { ChatMessageAPIType } from "../../api/chat-api";
import s from "./Message.module.css";

export const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    return (
      <div className={s.message}>
        <img
          src={message.photo}
          style={{ width: "30px", borderRadius: "50%" }}
          alt=""
        />{" "}
        <b className={s.username}>{message.userName}</b>
        <br />
        <div className={s.messageOfUser}>{message.message}</div>
      </div>
    );
  }
);
