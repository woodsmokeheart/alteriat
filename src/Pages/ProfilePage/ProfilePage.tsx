import css from "./ProfilePage.module.css";

export const ProfilePage = ({ user }: { user: any }) => {
  return (
    <div className={css.wrapper}>
      <p>{user.first_name}:1</p>
      <p> {user.last_name}:2</p>
      <p> {user.username}:3</p>
      <p> ({user.language_code}):4</p>
      <p>{user.id}:5</p>
    </div>
  );
};
