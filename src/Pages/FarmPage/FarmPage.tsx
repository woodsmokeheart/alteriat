import { useState } from "react";
import { Footer } from "components/Footer/Footer";
import { IconFingerprint } from "assets/svg/IconFingerprint";
import { HeaderFarm } from "components/HeaderFarm/HeaderFarm";
import css from "./FarmPage.module.css";

export const FarmPage = () => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <div className={css.wrapper}>
      <HeaderFarm />
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
      <Footer />
    </div>
  );
};
