import React, { useEffect, useState } from "react";

export const TelegramUser = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const tg = window.Telegram.WebApp; // Получаем объект webapp телеграма

    tg.expand(); // Расширяем на все окно
    tg.requestFullscreen();

    // Bot API 8.0+ Метод, который запрашивает открытие мини-приложения в полноэкранном режиме. Несмотря на то, что в полноэкранном режиме заголовок прозрачен, рекомендуется, чтобы мини-приложение устанавливало цвет заголовка с помощью метода setHeaderColor. Этот цвет помогает определить контрастный цвет для строки состояния и других элементов управления пользовательского интерфейса.

    tg.MainButton.setText("Changed Text1");
    tg.MainButton.textColor = "#F55353"; // Меняем цвет текста кнопки
    tg.MainButton.color = "#143F6B"; // Меняем цвет фона кнопки
    tg.MainButton.setParams({ color: "#143F6B" });

    setUser(tg.initDataUnsafe.user); // Сохраняем данные пользователя

    tg.onEvent("mainButtonClicked", () => {
      tg.sendData("some string that we need to send");
    });
  }, []);

  const toggleMainButton = () => {
    const tg = window.Telegram.WebApp;
    if (isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
    setIsVisible(!isVisible);
  };

  const toggleEnableMainButton = () => {
    const tg = window.Telegram.WebApp;
    if (isActive) {
      tg.MainButton.setParams({ color: "#E0FFFF" });
      tg.MainButton.disable();
    } else {
      tg.MainButton.setParams({ color: "#143F6B" });
      tg.MainButton.enable();
    }
    setIsActive(!isActive);
  };

  return (
    <div
      style={{
        color: "var(--tg-theme-text-color)",
        backgroundColor: "var(--tg-theme-bg-color)",
        textAlign: "center",
        fontSize: "18px",
      }}
    >
      asd
      <div id="usercard">
        <p>
          {user.first_name} {user.last_name} {user.username} (
          {user.language_code})
        </p>
        <p>{user.id}</p>
      </div>
      <p>Just text</p>
      <a
        className="link"
        href="https://mihailgok.ru"
        style={{ color: "var(--tg-theme-link-color)" }}
      >
        Link
      </a>
      <p className="hint" style={{ color: "var(--tg-theme-hint-color)" }}>
        Some little hint
      </p>
      <button
        className="button"
        onClick={toggleMainButton}
        style={{
          background: "var(--tg-theme-button-color)",
          color: "var(--tg-theme-button-text-color)",
          border: "none",
          fontSize: "18px",
          marginBottom: "20px",
        }}
      >
        Show/Hide Main Button
      </button>
      <button
        className="button"
        onClick={toggleEnableMainButton}
        style={{
          background: "var(--tg-theme-button-color)",
          color: "var(--tg-theme-button-text-color)",
          border: "none",
          fontSize: "18px",
        }}
      >
        Enable/Disable Main Button
      </button>
    </div>
  );
};
