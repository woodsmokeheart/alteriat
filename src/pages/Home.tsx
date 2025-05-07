import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useWallet } from '../hooks/useWallet';
import type { Profile } from '../services/supabase';
import styles from './Home.module.css';

const Home = () => {
  const { profile: currentUserProfile } = useWallet();
  const [users, setUsers] = useState<Profile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserProfile) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', currentUserProfile.id)
        .order('username');

      if (!error && data) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, [currentUserProfile]);

  if (!currentUserProfile) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Social Chat</h1>
        <div className={styles.userInfo}>
          <span>Welcome, {currentUserProfile.username}</span>
          <button
            className={styles.profileButton}
            onClick={() => navigate(`/profile/${currentUserProfile.username}`)}
          >
            My Profile
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <h2>Users</h2>
        <div className={styles.userList}>
          {users.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userInfo}>
                <h3>{user.username}</h3>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.button}
                  onClick={() => navigate(`/profile/${user.username}`)}
                >
                  View Profile
                </button>
                <button
                  className={`${styles.button} ${styles.primary}`}
                  onClick={() => navigate(`/chat/${user.username}`)}
                >
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home; 