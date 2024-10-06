import React, { useState, useEffect } from "react";
import styles from "./EarnPage.module.css";

interface Channel {
  id: number;
  name: string;
  avatar: string;
  points: number;
  isSubscribed: boolean; // состояние подписки
}

const BOT_TOKEN = "YOUR_BOT_TOKEN"; // Замените на ваш действующий токен
const CHANNEL_ID = "-1001688696412"; // ID вашего канала

const CHANNEL_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/getChat?chat_id=${CHANNEL_ID}`;

// Асинхронная функция для проверки подписки
const checkSubscription = async (userId: number) => {
  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL_ID}&user_id=${userId}`
  );
  const data = await response.json();
  if (
    data.ok &&
    (data.result.status === "member" ||
      data.result.status === "administrator" ||
      data.result.status === "creator")
  ) {
    return true;
  }
  return false;
};

export const EarnPage = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userId, setUserId] = useState<number | null>(null); // ID пользователя

  useEffect(() => {
    // Имитируем получение userId через Telegram WebApp API
    const initDataUnsafe = (window as any).Telegram.WebApp.initDataUnsafe;
    const userId = initDataUnsafe?.user?.id;
    if (userId) {
      setUserId(userId); // Сохраняем userId в состоянии
    }

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

  // Проверка подписки пользователя
  const checkUserSubscription = async () => {
    if (userId) {
      const subscribed = await checkSubscription(userId);
      setIsSubscribed(subscribed); // Обновляем состояние подписки
    } else {
      console.error("User ID не найден");
    }
  };

  const handleSubscribe = () => {
    // Логика подписки (например, редирект на Telegram)
    window.open("https://t.me/alteriat", "_blank");
    setTimeout(() => {
      checkUserSubscription(); // Проверяем подписку после некоторого времени
    }, 5000); // Даем 5 секунд на подписку
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
