import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'jurnaltani_auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cek state autentikasi awal dari SecureStore
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Gagal membaca token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async () => {
    try {
      // Simpan dummy token ke SecureStore sebagai simulasi login berhasil
      // Kita TIDAK menyimpan password dalam plaintext
      const dummyToken = `token_${new Date().getTime()}`;
      await SecureStore.setItemAsync(TOKEN_KEY, dummyToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Gagal menyimpan token:', error);
    }
  };

  const logout = async () => {
    try {
      // Hapus token dari SecureStore saat logout
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Gagal menghapus token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

