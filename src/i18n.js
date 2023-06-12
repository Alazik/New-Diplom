import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          greeting: {
            hello: "Change the language"
          },
          navbar: {
            profile: "Profile",
            messages: "Messages",
            users: "Users",
            settings: "Settings"
          },
          ProfileDataForm: {
            baseInfo: "Basic information",
            fio: "Full name: ",
            lookingJob: "Looking for a job: ",
            skill: "My professional skills: ",
            aboutMe: "About me: ",
            save: "Save"
          },
          changeYesNo: {
            change: "Change",
            yes: "Yes",
            no: "No"
          },
          profileStatus: {
            myStatus: "My status: ",
            noStatus: "No status"
          },
          myPosts: {
            createPost: "Create post",
            send: "Send"
          },
          header: {
            logout: "Log out",
            login: "Log in",
            registration: "Registration"
          },
          users: {
            prev: "Prev",
            next: "Next",
            follow: "FOLLOW",
            unfollow: "UNFOLLOW",
            find: "Find",
            all: "All",
            oFollowed: "Only followed",
            oUnfollowed: "Only unfollowed"
          },
          login: {
            login: "Log in",
            loginPage: "Entrance",
            email: "Enter the email",
            password: "Enter the password"
          }
        }
      },
      ru: {
        translation: {
          greeting: {
            hello: "Сменить язык"
          },
          navbar: {
            profile: "Профиль",
            messages: "Сообщения",
            users: "Пользователи",
            settings: "Настройки"
          },
          ProfileDataForm: {
            baseInfo: "Основная информация",
            fio: "ФИО: ",
            lookingJob: "Ищу работу: ",
            skill: "Мои профессиональные навыки: ",
            aboutMe: "Обо мне: ",
            save: "Сохранить"
          },
          changeYesNo: {
            change: "Изменить",
            yes: "Да",
            no: "Нет"
          },
          profileStatus: {
            myStatus: "Мой статус: ",
            noStatus: "Нет статуса"
          },
          myPosts: {
            createPost: "Создать пост",
            send: "Отправить"
          },
          header: {
            logout: "Выйти",
            login: "Войти",
            registration: "Регистрация"
          },
          users: {
            prev: "Пред.",
            next: "След.",
            follow: "ПОДПИСАТЬСЯ",
            unfollow: "ОТПИСАТЬСЯ",
            find: "Найти",
            all: "Все",
            oFollowed: "Только подписавших",
            oUnfollowed: "Только отписавших"
          },
          login: {
            login: "Войти",
            loginPage: "Вход",
            email: "Введите email",
            password: "Введите пароль"
          }
        }
      },
      kk: {
        translation: {
          greeting: {
            hello: "Тілді өзгерту"
          },
          navbar: {
            profile: "Профиль",
            messages: "Хабарламалар",
            users: "Пайдаланушылар",
            settings: "Параметрлер"
          },
          ProfileDataForm: {
            baseInfo: "Негізгі ақпарат",
            fio: "Аты-жөні: ",
            lookingJob: "Жұмыс іздеу: ",
            skill: "Менің кәсіби дағдыларым: ",
            aboutMe: "Мен туралы: ",
            save: "Сақтау"
          },
          changeYesNo: {
            change: "Өзгерту",
            yes: "Иә",
            no: "Жоқ"
          },
          profileStatus: {
            myStatus: "Менің мәртебем: ",
            noStatus: "Мәртебе жоқ"
          },
          myPosts: {
            createPost: "Пост жасау",
            send: "Жіберу"
          },
          header: {
            logout: "Шығу",
            login: "Кіру",
            registration: "Тіркеу"
          },
          users: {
            prev: "Aлдыңғы",
            next: "Келесі",
            follow: "ІС БАСУ",
            unfollow: "ІС БАСПАУ",
            find: "Табу",
            all: "Барлығы",
            oFollowed: "Тек іс басарлар",
            oUnfollowed: "Тек іс баспайтындар"
          },
          login: {
            login: "Кіру",
            loginPage: "Кіру",
            email: "Электрондық поштаны жазыңыз",
            password: "Құпия сөзді жазыңыз"
          }
        }
      }
    }
  });

export default i18n;