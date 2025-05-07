import React from 'react';
import { useProfileContext } from '../context/ProfileContext';
import { useWallet } from '@solana/wallet-adapter-react';

const Profile: React.FC = () => {
  const { profile } = useProfileContext();
  const { disconnect } = useWallet();

  // Дефолтная аватарка (можно заменить на любую ссылку)
  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${profile?.wallet_address}`;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <img
        src={avatarUrl}
        alt="avatar"
        style={{ width: 96, height: 96, borderRadius: '50%', marginBottom: 16 }}
      />
      <div className="profile-info">
        <p>Wallet: {profile?.wallet_address}</p>
      </div>
      <button onClick={disconnect} style={{ marginTop: 24 }}>
        Log out
      </button>
    </div>
  );
};

export default Profile; 