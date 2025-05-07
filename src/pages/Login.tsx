import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useProfileContext } from '../context/ProfileContext';

const Login: React.FC = () => {
  const { publicKey } = useWallet();
  const { createProfile, profile } = useProfileContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (publicKey && !profile) {
      createProfile();
    }
    if (profile) {
      navigate('/profile');
    }
  }, [publicKey, profile, createProfile, navigate]);

  return (
    <div className="login-container">
      <h1>Welcome to Social Chat</h1>
      <p>Connect your wallet to get started</p>
      <WalletMultiButton />
    </div>
  );
};

export default Login; 