import { Footer } from "components/Footer/Footer";

import css from "./FarmPage.module.css";
import { IconFingerprint } from "assets/svg/IconFingerprint";
import { HeaderFarm } from "components/HeaderFarm/HeaderFarm";

export const FarmPage = () => {
  return (
    <div className={css.wrapper}>
      <HeaderFarm />
      <button className={css.fingerprint}>
        <IconFingerprint width={100} height={100} />
      </button>
      <Footer />
    </div>
  );
};
