import React, {useContext, useEffect} from "react";
import s from "./Login.module.css";
import style from "./../common/FormsControls/FormsControls.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/context";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  const {t ,i18n} = useTranslation();
  

  useEffect(() => {
      const lng = localStorage.getItem('lg')
      i18n.changeLanguage(lng);
  }, [])

  const lng = navigator.language;
  return (
    <form onSubmit={handleSubmit} action="">
      <div>
        <Field
          className={s.login}
          placeholder={t('login.email')}
          name={"email"}
          component={Input}
          type={"text"}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          className={s.password}
          placeholder={t('login.password')}
          name={"password"}
          component={Input}
          type={"password"}
          validate={[required]}
        />
      </div>
      <div>
        {/* <Field component={Input} name={"rememberMe"} type={"checkbox"} />
        Remember me */}
      </div>

      {captchaUrl && <img alt="captchaUrl" src={captchaUrl} />}
      {captchaUrl && <div><Field className={s.symbols} placeholder={"Symbols from image"} name={"captcha"} validate={[required]} component={Input} /></div>}

      {error && <div className={style.formSummaryError}>{error}</div>}
      
      <div>
        <button className={s.logbutton}><span className={s.logspan}>{t('login.login')}</span></button>
      </div>
    </form>
  );
};

const LoginReduxform = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  const{loginPostData, myId} = useContext(AppContext)
  const {t ,i18n} = useTranslation();

  useEffect(() => {
      const lng = localStorage.getItem('lg')
      i18n.changeLanguage(lng);
  }, [])

  const lng = navigator.language;

  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    loginPostData(myId, false)
  };

  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div className={s.loginPage}>
      <h1 className={s.h1}>{t('login.loginPage')}</h1>
      <LoginReduxform onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
