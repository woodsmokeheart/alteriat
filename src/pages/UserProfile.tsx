import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Profile } from '../hooks/useProfile';

const UserProfile: React.FC = () => {
  const { walletAddress } = useParams<{ walletAddress: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();
      setProfile(data);
      setLoading(false);
    };
    if (walletAddress) fetchProfile();
  }, [walletAddress]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>User not found</div>;

  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${profile.wallet_address}`;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <img
        src={avatarUrl}
        alt="avatar"
        style={{ width: 96, height: 96, borderRadius: '50%', marginBottom: 16 }}
      />
      <div className="profile-info">
        <p>Wallet: {profile.wallet_address}</p>
      </div>
    </div>
  );
};

export default UserProfile; 