import { useState, useEffect, useCallback, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '../lib/supabase';

export interface Profile {
  id: string;
  wallet_address: string;
  created_at: string;
}

// Валидация имени пользователя
const validateUsername = (username: string): string | null => {
  const trimmed = username.trim();
  if (trimmed.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (trimmed.length > 20) {
    return 'Username must be less than 20 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return 'Username can only contain letters, numbers and underscores';
  }
  return null;
};

export function useProfile() {
  const { publicKey } = useWallet();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Используем ref для хранения состояния запроса
  const fetchingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Добавляем состояние для отслеживания доступности username
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [lastCheckedUsername, setLastCheckedUsername] = useState<string>('');

  const fetchProfile = useCallback(async () => {
    // Если уже идет запрос, не делаем новый
    if (fetchingRef.current) return;
    if (!publicKey) {
      setProfile(null);
      setLoading(false);
      return;
    }

    fetchingRef.current = true;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', publicKey.toString())
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setProfile(null);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  }, [publicKey]);

  const createProfile = useCallback(async () => {
    if (!publicKey) return null;
    if (fetchingRef.current) return null;

    fetchingRef.current = true;

    try {
      // Проверяем существование профиля перед созданием
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', publicKey.toString())
        .single();

      if (existingProfile) {
        setProfile(existingProfile);
        return existingProfile;
      }

      const { data, error } = await supabase
        .from('profiles')
        .insert([{ wallet_address: publicKey.toString() }])
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      return null;
    } finally {
      fetchingRef.current = false;
    }
  }, [publicKey]);

  const refetchProfile = useCallback(() => {
    // Очищаем предыдущий таймаут
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Устанавливаем новый таймаут для дебаунса
    timeoutRef.current = setTimeout(() => {
      fetchProfile();
    }, 300); // 300ms дебаунс
  }, [fetchProfile]);

  useEffect(() => {
    // При монтировании компонента
    fetchProfile();

    // При размонтировании очищаем таймауты
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fetchProfile]);

  // Функция для проверки доступности username
  const checkUsernameAvailability = async (username: string) => {
    const trimmedUsername = username.trim();
    
    // Не проверяем, если:
    // 1. Пустая строка
    // 2. Длина меньше 3 символов
    // 3. Это тот же username, что мы только что проверяли
    if (!trimmedUsername || 
        trimmedUsername.length < 3 || 
        trimmedUsername === lastCheckedUsername) {
      return;
    }

    // Проверяем базовую валидацию перед запросом
    const validationError = validateUsername(trimmedUsername);
    if (validationError) {
      setIsUsernameAvailable(false);
      return;
    }

    setIsCheckingUsername(true);
    setLastCheckedUsername(trimmedUsername);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', trimmedUsername)
        .maybeSingle();

      if (error) throw error;
      setIsUsernameAvailable(!data);
    } catch (err) {
      console.error('Error checking username availability:', err);
      setIsUsernameAvailable(null);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  return {
    profile,
    loading,
    error,
    createProfile,
    checkUsernameAvailability,
    isCheckingUsername,
    isUsernameAvailable,
    setIsUsernameAvailable,
    refetchProfile,
  };
} 