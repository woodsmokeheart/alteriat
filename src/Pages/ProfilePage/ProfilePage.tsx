import { useCreateUserStore } from "components/store/userStore";
import { PageLayout } from "components/Layouts/PageLayout/PageLayout";

export const ProfilePage = () => {
  const { firstName, username, languageCode, userID } = useCreateUserStore();
  return (
    <PageLayout>
      <p>{firstName}</p>
      <p> {username}</p>
      <p> {languageCode}</p>
      <p>{userID}</p>
    </PageLayout>
  );
};
