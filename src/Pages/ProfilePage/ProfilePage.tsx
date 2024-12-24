import css from "./ProfilePage.module.css";

export const ProfilePage = ({ user }: { user: any }) => {
  return (
    <div className={css.wrapper}>
      <p>
        {user.first_name} {user.last_name} {user.username} ({user.language_code}
        )
      </p>
      <p>{user.id}</p>
    </div>
  );
};
