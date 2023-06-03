import { AnyAction, Dispatch } from "redux";
import { ChatMessageAPIType, StatusType, chatAPI } from "../api/chat-api";
import { v1 } from 'uuid';

const MESSAGES_RECEIVED = "samurai-network/chat/MESSAGES_RECEIVED";
const STATUS_CHANGED = "samurai-network/chat/STATUS_CHANGED";

export type chatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
  messages: [] as chatMessageType[],
  status: "pending" as StatusType,
};

const chatReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case MESSAGES_RECEIVED: {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map((m: any) => ({...m, id: v1() }))].filter((m, index, array) => index >= array.length - 100)
      };
    }
    case STATUS_CHANGED: {
      return {
        ...state,
        status: action.payload.status,
      };
    }
    default:
      return state;
  }
};

export const messagesReceived = (messages: ChatMessageAPIType[]) => {
  return {
    type: MESSAGES_RECEIVED,
    payload: { messages },
  };
};

export const statusChanged = (status: StatusType) => {
  return {
    type: STATUS_CHANGED,
    payload: { status },
  };
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening =
  () => async (dispatch: Dispatch<AnyAction>) => {
    chatAPI.start();
    chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch));
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
  };

export const stopMessagesListening =
  () => async (dispatch: Dispatch<AnyAction>) => {
    chatAPI.unsubscribe(
      "messages-received",
      newMessageHandlerCreator(dispatch)
    );
    chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
  };

export const sendMessage = (message: string) => async (dispatch: any) => {
  chatAPI.sendMessage(message);
};

export default chatReducer;
