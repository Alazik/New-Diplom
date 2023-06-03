import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { chatMessageType } from "../../redux/chat-reducer";
import { Message } from "./Message";

export const Messages: React.FC<{}> = React.memo(({}) => {
  const messages = useSelector((state: any) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      style={{
        height: "630px",
        overflowY: "scroll",
        backgroundColor: "#ECF5FC",
      }}
      onScroll={scrollHandler}
    >
      {messages.map(
        (m: chatMessageType, index: React.Key | null | undefined) => (
          <Message key={m.id} message={m} />
        )
      )}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
});
