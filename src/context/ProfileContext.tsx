import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useProfile, Profile } from '../hooks/useProfile';

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  createProfile: () => Promise<Profile | null>;
  refetchProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const profileData = useProfile();
  
  // Мемоизируем значение контекста
  const value = useMemo(() => profileData, [
    profileData.profile,
    profileData.loading,
    profileData.error,
    // Не включаем функции в зависимости, так как они уже мемоизированы
  ]);
  
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
} 