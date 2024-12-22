import { useEffect, useState } from "react";
import { Footer } from "components/Footer/Footer";
import { IconFingerprint } from "assets/svg/IconFingerprint";
import { HeaderFarm } from "components/HeaderFarm/HeaderFarm";
import css from "./FarmPage.module.css";
import { TriangleSpinner } from "components/Loaders/Triangle/TriangleSpinner";
import React from "react";

const facts = [
  "Черный квадрат нарисовал Малевич",
  "2 x 2 = 4",
  "Скорость света 299 792 км/с",
  "Площадь круга равна πr²",
  "Солнце — это звезда",
];

export const FarmPage = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const [currentFact, setCurrentFact] = useState(0);
  const [factInterval, setFactInterval] = useState<number | null>(null);

  const handlePressStart = () => {
    setIsPressed(true);
    const interval = window.setInterval(() => {
      setCurrentFact((prevFact) => (prevFact + 1) % facts.length);
    }, 1000);
    setFactInterval(interval);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    if (factInterval !== null) {
      clearInterval(factInterval);
      setFactInterval(null);
    }
  };
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
          <div className={css.content}>
            <div className={css.carousel_facts}>
              <p>{facts[currentFact]}</p>
            </div>
            <div className={css.fingerprint_container}>
              <button
                className={`${css.fingerprint} ${isPressed ? css.active : ""}`}
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
              >
                <IconFingerprint width={100} height={100} />
              </button>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
};
