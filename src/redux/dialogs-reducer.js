const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
  messages: [
    { id: 1, message: "Siiuuuuuuuuuuuuuuu" },
    { id: 2, message: "Я просто обожаю 3d вещички" },
    { id: 3, message: "Салам бро, как ты?" },
    { id: 4, message: "Эщс" },
  ],
  dialogs: [
    { id: 1, name: "Nurik", avatar: "" },
    { id: 2, name: "Sula" },
    { id: 3, name: "Islam" },
    { id: 4, name: "Almaznik" },
  ]
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return{
        ...state,
        messages: [...state.messages, { id: 5, message: body }]
      }
     
    }
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => {
  return {
    type: SEND_MESSAGE, newMessageBody
  };
};

export default dialogsReducer;
