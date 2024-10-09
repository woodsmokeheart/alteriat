import { useState, useEffect } from "react";
import { BottomBar } from "../../BottomBar/BottomBar";
import { FarmScale } from "../../FarmScale/FarmScale";
import { useCreateUserStore } from "../../store/userStore";
import css from "./FarmPage.module.css";

export const FarmPage = () => {
  const [currentImage, setCurrentImage] = useState(
    "/images/backgrounds/spark_loader.gif"
  );
  const { userGender } = useCreateUserStore();

  useEffect(() => {
    // Функция для предзагрузки и изменения изображения
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;

      // Используем метод decode() для ожидания загрузки
      img
        .decode()
        .then(() => {
          setCurrentImage(src); // Обновляем изображение только после полной загрузки
        })
        .catch((error) => {
          console.error("Ошибка загрузки изображения:", error);
        });
    };

    // Логика для выбора изображения в зависимости от пола
    if (userGender === "Male") {
      preloadImage("/images/char/Tark.png");
    } else if (userGender === "Female") {
      preloadImage("/images/char/Rose.png");
    }
  }, [userGender]); // Срабатывает при изменении userGender

  console.log(userGender, "userGender");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${currentImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={css.content}>
        <FarmScale />
      </div>
      <BottomBar />
    </div>
  );
};
