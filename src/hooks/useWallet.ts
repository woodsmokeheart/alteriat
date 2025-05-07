import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import type { Profile } from '../services/supabase';

export const useWallet = () => {
  console.log('useWallet hook initializing');
  
  const { publicKey, connected, connect, disconnect } = useSolanaWallet();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('useWallet effect running, connected:', connected);
    console.log('publicKey:', publicKey?.toString());
    
    const fetchProfile = async () => {
      if (!publicKey) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', publicKey.toString())
          .single();

        if (error) throw error;
        setProfile(data);
        console.log('Profile loaded:', data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (connected) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [connected, publicKey]);

  const createProfile = async (username: string) => {
    if (!publicKey) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            wallet_address: publicKey.toString(),
            username,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error creating profile:', error);
      return null;
    }
  };

  return {
    publicKey,
    connected,
    connect,
    disconnect,
    profile,
    loading,
    createProfile,
  };
}; 