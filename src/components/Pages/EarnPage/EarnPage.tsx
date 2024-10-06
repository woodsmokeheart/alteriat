import React, { useState, useEffect } from "react";
import styles from "./EarnPage.module.css";

interface Channel {
  id: number;
  name: string;
  avatar: string;
  points: number;
  isSubscribed: boolean; // состояние подписки
}

const BOT_TOKEN = "7891645977:AAHxkkMue5K7IL-5qog57MSEWRmmlm4ET8w";
const CHANNEL_ID = "-1001688696412";

const CHANNEL_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/getChat?chat_id=${CHANNEL_ID}`;

export const EarnPage = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Получаем информацию о канале
    fetch(CHANNEL_API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          const { id, title, photo_url } = data.result;
          setChannel({
            id,
            name: title,
            avatar: photo_url,
            points: 3000,
            isSubscribed: false, // по умолчанию не подписан
          });
        }
      })
      .catch((error) => console.error("Error fetching channel data:", error));
  }, []);

  const handleSubscribe = () => {
    // Логика подписки (например, редирект на Telegram)
    window.open("https://t.me/alteriat", "_blank");
    setIsSubscribed(true); // Предполагаем, что подписка произошла успешно
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Задания для подписок</h1>
      {channel ? (
        <div className={styles.channelItem}>
          <img
            src={channel.avatar}
            alt={`${channel.name} avatar`}
            className={styles.avatar}
          />
          <h2 className={styles.channelName}>{channel.name}</h2>
          <p className={styles.points}>{channel.points} очков за подписку</p>
          {!isSubscribed ? (
            <button className={styles.button} onClick={handleSubscribe}>
              Подписаться
            </button>
          ) : (
            <button className={styles.completedButton} disabled>
              Выполнено
            </button>
          )}
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};
