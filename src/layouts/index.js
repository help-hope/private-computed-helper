import React from "react";
import css from "./style.less";

export default function BasicLayout({ children }) {

  return (
    <div className={css.basic_layout_container}>
      {children}
    </div>
  )
};