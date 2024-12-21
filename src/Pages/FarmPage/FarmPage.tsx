import { useEffect, useState } from "react";
import { Footer } from "components/Footer/Footer";
import { IconFingerprint } from "assets/svg/IconFingerprint";
import { HeaderFarm } from "components/HeaderFarm/HeaderFarm";
import css from "./FarmPage.module.css";
import { TriangleSpinner } from "components/Loaders/Triangle/TriangleSpinner";
import React from "react";

export const FarmPage = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setIsLoader(true);

    setTimeout(() => {
      setIsLoader(false);
    }, 3000);
  }, []);

  return (
    <div className={css.wrapper}>
      {isLoader ? (
        <TriangleSpinner />
      ) : (
        <React.Fragment>
          <HeaderFarm />
          <div className={css.fingerprint_container}>
            <button
              className={`${css.fingerprint} ${isPressed ? css.active : ""}`}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
              onTouchStart={() => setIsPressed(true)}
              onTouchEnd={() => setIsPressed(false)}
            >
              <IconFingerprint width={100} height={100} />
            </button>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
};
