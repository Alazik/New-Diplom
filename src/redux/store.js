import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likesCount: "1" },
        { id: 2, message: "Salam bro", likesCount: "12" },
        { id: 3, message: "Чуваки сверху пидоры", likesCount: "100" },
      ],
      newPostText: "",
    },

    dialogsPage: {
      messages: [
        { id: 1, message: "Siiuuuuuuuuuuuuuuu" },
        { id: 2, message: "Я просто обожаю 3d хуйню" },
        { id: 3, message: "Салам бро, как ты?" },
        { id: 4, message: "Эщс" },
      ],
      dialogs: [
        { id: 1, name: "Nurik", avatar: "" },
        { id: 2, name: "Sula" },
        { id: 3, name: "Islam" },
        { id: 4, name: "Almaznik" },
      ],
      newMessageBody: "",
    },

    sidebar: {},
  },

  _callSubscriber() {
    console.log("State has been changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};

export default store;

window.store = store;
