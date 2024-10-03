import React, { useState, useEffect } from "react";
import css from "./FarmScale.module.css";

export const FarmScale = () => {
  const [isFarming, setIsFarming] = useState(false); // для контроля состояния фарминга
  const [progress, setProgress] = useState(0); // прогресс-бар
  const [earnedPoints, setEarnedPoints] = useState(0); // очки, заработанные за один цикл
  const [totalPoints, setTotalPoints] = useState(0); // общий счётчик очков
  const [isCompleted, setIsCompleted] = useState(false); // контроль завершения процесса

  useEffect(() => {
    if (isFarming && !isCompleted) {
      const totalDuration = 60 * 1000; // 1 минута в миллисекундах
      const intervalDuration = 1000; // обновляем каждую секунду
      const totalSteps = totalDuration / intervalDuration;

      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval); // остановить таймер при достижении 100%
            setIsCompleted(true); // процесс завершён
            return 100;
          }
          setEarnedPoints((prevPoints) => prevPoints + 3); // увеличиваем заработанные очки
          return prevProgress + 100 / totalSteps;
        });
      }, intervalDuration);

      return () => clearInterval(interval);
    }
  }, [isFarming, isCompleted]);

  const startFarm = () => {
    setIsFarming(true);
    setProgress(0); // сбросить прогресс
    setEarnedPoints(0); // сбросить заработанные очки
    setIsCompleted(false); // сбросить флаг завершения
  };

  const getPoints = () => {
    setTotalPoints((prevTotal) => prevTotal + earnedPoints); // добавляем заработанные очки к общему счётчику
    setIsFarming(false); // останавливаем процесс
    setProgress(0); // сброс прогресс-бара
    setEarnedPoints(0); // сброс заработанных очков после получения
    setIsCompleted(false); // вернуть состояние в начальное для нового цикла
  };

  return (
    <div className={css.wrapper}>
      <div className={css.farm_container}>
        <div className={css.points_counter}>
          <div>
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/3d-fluency/94/dollar-coin.png"
              alt="dollar-coin"
            />
          </div>
          <div className={css.counter}>{totalPoints}</div> {/* общий счётчик */}
        </div>
        <div className={css.progress_container}>
          <div className={css.progressWrapper}>
            <div
              className={css.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={css.progress_counters}>
            <div className={css.earnedPoints}>
              <div>+3</div> wALTR/SEC
            </div>
            <div className={css.earnedPoints}>
              <div>{earnedPoints}</div> wALTR
            </div>
            <div className={css.button_container}>
              {!isFarming && !isCompleted && (
                <button className={css.button_farm} onClick={startFarm}>
                  Start farm
                </button>
              )}
              {isCompleted && (
                <button className={css.button_farm} onClick={getPoints}>
                  Get Points
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
