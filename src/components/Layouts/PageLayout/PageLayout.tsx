import React, { ReactNode } from "react";
import { Footer } from "components/Footer/Footer";

import css from "./PageLayout.module.css";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={css.wrapper}>
      {children}
      <Footer />
    </div>
  );
};
