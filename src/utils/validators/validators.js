import s from "./validators.module.css"

export const required = (value) => {
    if (value) return undefined;

    return  <div className={s.warning}>Fill in the field!</div>
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}