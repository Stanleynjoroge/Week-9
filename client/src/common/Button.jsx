import React from "react";
import "./button.css";
import {useSelector}  from "react-redux";
const Button = ({ children, classType, onClick, type, color, text }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <button className={` ${color} ${classType} ${isDarkMode === true ? 'bg-black ${color} ' : '${color} '} `} onClick={onClick} type={type}>
      {/* {children} */}
      {text}
    </button>
  );
};
export default Button;
