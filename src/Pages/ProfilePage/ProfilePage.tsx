import { useCreateUserStore } from "components/store/userStore";
import css from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { firstName, username, languageCode, userID } = useCreateUserStore();
  return (
    <div className={css.wrapper}>
      <p>{firstName}</p>
      <p> {username}</p>
      <p> {languageCode}</p>
      <p>{userID}</p>
    </div>
  );
};
