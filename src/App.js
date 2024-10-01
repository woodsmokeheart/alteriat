import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const initTelegram = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const userData = window.Telegram.WebApp.initDataUnsafe.user;
        if (userData) {
          setUser(userData);
        }
      }
    };

    initTelegram();
  }, []);
  return (
    <div>
      {user ? (
        <div>
          <h1>
            Привет, {user.first_name} {user.last_name}!
          </h1>
          {user.photo_url && (
            <img src={user.photo_url} alt="Аватар пользователя" />
          )}
        </div>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </div>
  );
}

export default App;
