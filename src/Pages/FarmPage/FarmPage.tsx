import { Footer } from "components/Footer/Footer";
import { IconLogoRcs } from "assets/svg/IconLogoRcs";

import css from "./FarmPage.module.css";
import { IconFingerprint } from "assets/svg/IconFingerprint";
import { HeaderFarm } from "components/HeaderFarm/HeaderFarm";

export const FarmPage = () => {
  return (
    <div className={css.wrapper}>
      <HeaderFarm />
      <div className={css.centeredIcon}>
        <IconLogoRcs width={300} height={300} />
      </div>
      <button className={css.fingerprint}>
        <IconFingerprint width={100} height={100} />
      </button>
      <Footer />
    </div>
  );
};
