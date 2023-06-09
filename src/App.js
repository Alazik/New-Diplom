import React, { Component, Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
// import News from "./components/News/News";
// import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { compose } from "redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Preloader from "./components/common/Preloader/Loader"; 
import AllPosts from "./components/Posts/AllPosts";
import { AppProvider } from "./components/context/context";

// const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = lazy(() => import('./pages/Chat/ChatPage'));

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <AppProvider>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper__content">
          <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
              <Route path="/New-Diplom" element={<Navigate to="/profile" />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path='/profile' element={<ProfileContainer />} />
              {/* <Route path="/dialogs/*" element={<DialogsContainer />} /> */}
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/users" element={<UsersContainer />} />
              {/* <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} /> */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/allposts" element={<AllPosts />} />
              {/* <Route path="*" element={<div className="error">404 NOT FOUND</div>} /> */}
            </Routes>
          </Suspense>
        </div>
      </div>
      </AppProvider>

    );
  }
};

export const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }
  return ComponentWithRouterProp;
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

