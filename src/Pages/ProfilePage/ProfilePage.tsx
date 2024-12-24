import { useCreateUserStore } from "components/store/userStore";
import css from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { firstName, username, languageCode, userID } = useCreateUserStore();
  return (
    <div className={css.wrapper}>
      <p>{firstName}:1</p>
      <p> {username}:2</p>
      <p> {languageCode}:3</p>
      <p>{userID}:4</p>
    </div>
  );
};
