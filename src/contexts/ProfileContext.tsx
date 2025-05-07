import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '../lib/supabase';

export type Profile = {
  id: string;
  wallet_address: string;
  username: string;
  created_at: string;
};

type ProfileContextType = {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  createProfile: () => Promise<Profile | null>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { publicKey } = useWallet();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!publicKey || loading || isInitialized) return;

      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', publicKey.toString())
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          setError(error.message);
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to fetch profile');
        setProfile(null);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    fetchProfile();
  }, [publicKey]);

  // Сбрасываем состояние при отключении кошелька
  useEffect(() => {
    if (!publicKey) {
      setProfile(null);
      setError(null);
      setIsInitialized(false);
    }
  }, [publicKey]);

  const createProfile = async (): Promise<Profile | null> => {
    if (!publicKey) {
      setError('Wallet not connected');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            wallet_address: publicKey.toString(),
            username: publicKey.toString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        setError(error.message);
        return null;
      }
      
      setProfile(data);
      return data;
    } catch (err) {
      console.error('Failed to create profile:', err);
      setError('Failed to create profile');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, error, createProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}; 