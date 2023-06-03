import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import s from "./Settings.module.css";

let Settings = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = localStorage.getItem("lg");
    i18n.changeLanguage(lng);
  }, []);

  const lng = navigator.language;

  return (
    <div>
      <div className={s.changeLgText}>
        <h2>{t("greeting.hello")}</h2>
      </div>
      <div className={s.flexLg}>
        <div>
          <button
            onClick={() => {
              localStorage.setItem("lg", "ru");
              i18n.changeLanguage("ru");
            }}
            className={s.button}
          >
            <span className={s.button_lg}>
              <span className={s.button_sl}></span>
              <span className={s.button_text}>RUS</span>
            </span>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              localStorage.setItem("lg", "kk");
              console.log(localStorage.getItem("lg"));
              i18n.changeLanguage("kk");
            }}
            className={s.button}
          >
            <span className={s.button_lg}>
              <span className={s.button_sl}></span>
              <span className={s.button_text}>KAZ</span>
            </span>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              localStorage.setItem("lg", "en");
              i18n.changeLanguage("en");
            }}
            className={s.button}
          >
            <span className={s.button_lg}>
              <span className={s.button_sl}></span>
              <span className={s.button_text}>ENG</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
