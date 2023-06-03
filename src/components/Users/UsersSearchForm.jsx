import React from "react";
import { useEffect } from 'react';
import { Field, Form, Formik } from "formik";
import s from "./UsersSearchForm.module.css"
import { useTranslation } from "react-i18next";

const usersSearchFormValidate = (values) => {
  const errors = {};
  return errors;
};

const UsersSearchForm = React.memo((props) => {
  const submit = (values, { setSubmitting }) => {
    const filter = {
        term: values.term,
        friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    }
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;

  return (
    <div>
      <Formik
        initialValues={{ term: "" , friend: "null"}}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <Field type="text" name="term" className={s.text}/>
            <Field name="friend" as="select" className={s.options}>
              <option value="null">{t('users.all')}</option>
              <option value="true">{t('users.oFollowed')}</option>
              <option value="false">{t('users.oUnfollowed')}</option>
            </Field>
            <button type="submit" disabled={isSubmitting} className={s.searchButton}>
              {t('users.find')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
