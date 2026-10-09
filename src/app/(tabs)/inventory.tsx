import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { farmStyles, COLORS } from '../../constants/farmStyles';

export default function InventoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manajemen Inventaris</Text>
      <Text style={styles.subtitle}>Pantau stok pupuk, bibit, dan pestisida.</Text>
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
