import React, { useEffect, useState } from "react";
import { Footer } from "components/Footer/Footer";
import { IconFingerprint } from "assets/svg/IconFingerprint";
import { HeaderFarm } from "components/HeaderFarm/HeaderFarm";
import { TriangleSpinner } from "components/Loaders/Triangle/TriangleSpinner";
import { mockShortFacts } from "./mockShortFacts";

import css from "./FarmPage.module.css";
import {
  setAccountScore,
  setFarmScore,
  useCreateFarmStore,
} from "components/store/farmStore";

export const FarmPage = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const [currentFact, setCurrentFact] = useState(0);
  const [factInterval, setFactInterval] = useState<NodeJS.Timeout | null>(null);
  const [scoreInterval, setScoreInterval] = useState<NodeJS.Timeout | null>(
    null
  ); // Для хранения интервала набора очков

  const [timeLeft, setTimeLeft] = useState(120); // 2 мин в секундах
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isRoundOver, setIsRoundOver] = useState(false); // Флаг завершения раунда

  const { farmScore } = useCreateFarmStore();

  const clearAllIntervals = () => {
    if (scoreInterval !== null) {
      clearInterval(scoreInterval);
      setScoreInterval(null);
    }
    if (factInterval !== null) {
      clearInterval(factInterval);
      setFactInterval(null);
    }
  };

  const handlePressStart = () => {
    setIsPressed(true);
    setIsTimerRunning(true);
    setIsRoundOver(false); // Сбрасываем флаг завершения раунда

    // Запускаем интервал для обновления очков
    const newScoreInterval = setInterval(() => {
      setFarmScore((prevScore) => prevScore + 1);
    }, 1000);

    // Запускаем интервал для смены фактов
    const newFactInterval = setInterval(() => {
      setCurrentFact((prevFact) => (prevFact + 1) % mockShortFacts.length);
    }, 1500);

    setScoreInterval(newScoreInterval);
    setFactInterval(newFactInterval);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    setIsTimerRunning(false);
    clearAllIntervals();

    // Сброс состояния на начальное
    setTimeLeft(120); // Начальное время
    setCurrentFact(0); // Первый факт

    // Сбрасываем очки в 0
    setFarmScore(() => 0);
  };

  useEffect(() => {
    if (isTimerRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);

      if (timeLeft === 0) {
        setIsTimerRunning(false);
        setIsRoundOver(true); // Устанавливаем флаг завершения раунда
        clearAllIntervals(); // Останавливаем все интервалы
      }

      return () => clearInterval(timer);
    }
  }, [isTimerRunning, timeLeft]);

  useEffect(() => {
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 3000);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className={css.wrapper}>
      {isLoader ? (
        <TriangleSpinner />
      ) : (
        <React.Fragment>
          <HeaderFarm />
          <div className={css.content}>
            <div className={css.timer}>{formatTime(timeLeft)}</div>
            <div className={css.carousel_facts}>
              <p key={currentFact}>{mockShortFacts[currentFact]}</p>
            </div>
            <div className={css.fingerprint_container}>
              {isRoundOver ? (
                <button
                  className={css.round_over_text}
                  onClick={() => {
                    setAccountScore(farmScore); // Сохраняем очки
                    setFarmScore(() => 0); // Сбрасываем текущие очки фарма
                    setIsRoundOver(false); // Убираем флаг завершения
                    setTimeLeft(10); // Сбрасываем таймер
                    setCurrentFact(0); // Возвращаемся к первому факту
                    setIsPressed(false); // Сбрасываем состояние нажатия
                  }}
                >
                  Claim now {farmScore} INT
                </button>
              ) : (
                <button
                  className={`${css.fingerprint} ${
                    isPressed ? css.active : ""
                  }`}
                  onMouseDown={handlePressStart}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onTouchStart={handlePressStart}
                  onTouchEnd={handlePressEnd}
                >
                  <IconFingerprint width={100} height={100} />
                </button>
              )}
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
};
