import React, { useState } from "react";
import { useEffect } from 'react';
import s from "./Users.module.css";
import cn from "classnames";
import style from "./Paginator.module.css"
import { useTranslation } from "react-i18next";

let Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [ ];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
          className={style.buttons}
        >
          {t('users.prev')}
        </button>
      )}

      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <span className={cn({[s.selectedPage]: currentPage === p}, style.pageNumber)} key={p}
              onClick={(e) => {
                onPageChanged(p);}}>
              {" " + p + " "}
            </span>
          );
        })}

      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);}} className={style.buttons}>
          {t('users.next')}
        </button>
      )}
    </div>
  );
};

export default Paginator;
