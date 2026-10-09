import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Link } from 'expo-router';
import { COLORS } from '../../constants/farmStyles';
import { useAuth } from '../../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useAuth();

  const handleLogin = async () => {
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Email dan password tidak boleh kosong.');
      return;
    }
    
    try {
      // Ambil kredensial dummy dari SecureStore (jika ada dari halaman Register)
      const savedEmail = await SecureStore.getItemAsync('dummy_user_email');
      const savedPassword = await SecureStore.getItemAsync('dummy_user_password');
      
      // Jika ada data terdaftar, cocokan. Jika tidak, pakai dummy statis
      const isValidRegistered = savedEmail === email && savedPassword === password;
      const isDummyStatic = email === 'admin@jurnaltani.com' && password === '123456';

      if (isValidRegistered || isDummyStatic) {
        // Authenticated
        login();
      } else {
        setErrorMsg('Email atau password salah!');
      }
    } catch (e) {
      setErrorMsg('Terjadi kesalahan sistem.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Masuk ke Akun</Text>
            <Text style={styles.subtitle}>Selamat datang kembali di JurnalTani</Text>
          </View>

          {errorMsg ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email atau Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="Input Email"
                accessibilityRole="text"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password / PIN</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Masukkan password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  accessibilityLabel="Input Password"
                  accessibilityRole="text"
                />
                <Pressable 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  accessibilityLabel={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  accessibilityRole="button"
                >
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={24} 
                    color={COLORS.textMuted} 
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.forgotPasswordContainer}>
              <Pressable onPress={() => {}} accessibilityRole="button">
                <Text style={styles.forgotPasswordText}>Lupa password?</Text>
              </Pressable>
            </View>

            <Pressable 
              style={({ pressed }) => [styles.loginButton, pressed && styles.buttonPressed]}
              onPress={handleLogin}
              accessibilityRole="button"
              accessibilityLabel="Tombol Masuk"
            >
              <Text style={styles.loginButtonText}>Masuk</Text>
            </Pressable>

            {/* Optional Biometric Button UI */}
            <Pressable style={styles.biometricButton} accessibilityRole="button">
              <Ionicons name="finger-print" size={24} color={COLORS.primary} />
              <Text style={styles.biometricText}>Masuk dengan Biometrik</Text>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Belum punya akun? </Text>
              <Link href="/register" asChild>
                <Pressable accessibilityRole="link">
                  <Text style={styles.footerLink}>Daftar</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
  errorContainer: {
    backgroundColor: COLORS.dangerLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 14,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  eyeIcon: {
    padding: 16,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#F59E0B', // Aksen gold/yellow seperti permintaan
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  biometricText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    color: COLORS.textMuted,
  },
  footerLink: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
