import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { farmStyles, COLORS } from '../../constants/farmStyles';

export default function JournalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jurnal Aktivitas Harian</Text>
      <Text style={styles.subtitle}>Catat penyiraman, pemupukan, dll di sini.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
