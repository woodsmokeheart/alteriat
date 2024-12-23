import { useCallback, useEffect, useState } from "react";
import { IconFingerprint } from "assets/svg/IconFingerprint";
import { HeaderFarm } from "components/HeaderFarm/HeaderFarm";
import { mockShortFacts } from "./mockShortFacts";

import css from "./FarmPage.module.css";

import {
  setAccountScore,
  setFarmScore,
  useCreateFarmStore,
} from "components/store/farmStore";
import { PageLayout } from "components/Layouts/PageLayout/PageLayout";

export const FarmPage = () => {
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

  const clearAllIntervals = useCallback(() => {
    if (scoreInterval !== null) {
      clearInterval(scoreInterval);
      setScoreInterval(null);
    }
    if (factInterval !== null) {
      clearInterval(factInterval);
      setFactInterval(null);
    }
  }, [factInterval, scoreInterval]);

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
  }, [clearAllIntervals, isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <PageLayout>
      <HeaderFarm />
      <div className={css.content}>
        <div className={css.timer}>{formatTime(timeLeft)}</div>
        <div className={css.carousel_container}>
          <div className={css.farm_score}>
            <p>{farmScore} очков собрано</p>
          </div>
          <div className={css.carousel_facts}>
            <p key={currentFact}>{mockShortFacts[currentFact]}</p>
          </div>
        </div>

        <div className={css.fingerprint_container}>
          {isRoundOver ? (
            <button
              className={css.round_over_text}
              onClick={() => {
                setAccountScore(farmScore); // Сохраняем очки
                setFarmScore(() => 0); // Сбрасываем текущие очки фарма
                setIsRoundOver(false); // Убираем флаг завершения
                setTimeLeft(120); // Сбрасываем таймер
                setCurrentFact(0); // Возвращаемся к первому факту
                setIsPressed(false); // Сбрасываем состояние нажатия
              }}
            >
              Claim now {farmScore} INT
            </button>
          ) : (
            <button
              className={`${css.fingerprint} ${isPressed ? css.active : ""}`}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
            >
              <IconFingerprint width={90} height={90} />
            </button>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
