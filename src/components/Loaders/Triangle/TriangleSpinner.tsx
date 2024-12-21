import React from "react";
import { Triangle } from "react-loader-spinner";
import css from "./TriangleSpinner.module.css";

export const TriangleSpinner = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.spinner_container}>
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#d29922"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <div className={css.label}>INTA</div>
      </div>
    </div>
  );
};
