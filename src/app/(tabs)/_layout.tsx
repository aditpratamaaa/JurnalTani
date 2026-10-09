import React, { useState, useRef, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/farmStyles';
import { Pressable, Text, View, Modal, Animated, StyleSheet, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.75;

export default function TabLayout() {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(slideAnim, {
        toValue: -MENU_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsMenuOpen(false));
    } else {
      setIsMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogout = () => {
    toggleMenu();
    setTimeout(() => {
      logout();
    }, 300);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Beranda',
            headerTitle: '',
            headerLeft: () => (
              <Pressable 
                onPress={toggleMenu} 
                style={{ marginLeft: 16 }}
                accessibilityRole="button"
                accessibilityLabel="Buka Menu Samping"
              >
                <Ionicons name="menu" size={28} color="#fff" />
              </Pressable>
            ),
            headerRight: () => (
              <Text style={{ marginRight: 16, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                Menu Utama
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: 'Jurnal',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="inventory"
          options={{
            title: 'Inventaris',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Custom Side Menu Modal */}
      <Modal 
        visible={isMenuOpen} 
        transparent 
        animationType="none"
        onRequestClose={toggleMenu}
      >
        <Pressable style={styles.menuOverlay} onPress={toggleMenu}>
          <View style={styles.menuBackdrop} />
          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <Pressable style={{ flex: 1 }} onPress={() => { /* Cegah klik bocor ke overlay */ }}>
            
            {/* Menu Header */}
            <View style={styles.menuHeader}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' }} 
                style={styles.menuProfileImage} 
              />
              <Text style={styles.menuProfileName}>Pak Budi</Text>
              <Text style={styles.menuProfileEmail}>budi.petani@jurnaltani.com</Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuItemsContainer}>
              <Pressable style={styles.menuItem} onPress={toggleMenu}>
                <Ionicons name="leaf-outline" size={24} color={COLORS.text} />
                <Text style={styles.menuItemText}>Pengaturan Lahan</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={toggleMenu}>
                <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
                <Text style={styles.menuItemText}>Notifikasi</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={toggleMenu}>
                <Ionicons name="help-circle-outline" size={24} color={COLORS.text} />
                <Text style={styles.menuItemText}>Pusat Bantuan</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={toggleMenu}>
                <Ionicons name="information-circle-outline" size={24} color={COLORS.text} />
                <Text style={styles.menuItemText}>Tentang Aplikasi</Text>
              </Pressable>
            </View>

            {/* Menu Footer / Logout */}
            <View style={styles.menuFooter}>
              <Pressable 
                style={styles.logoutButton} 
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={24} color={COLORS.danger} />
                <Text style={styles.logoutText}>Keluar / Log Out</Text>
              </Pressable>
            </View>

            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  menuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    width: MENU_WIDTH,
    height: '100%',
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  menuHeader: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: COLORS.primaryLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  menuProfileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  menuProfileEmail: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  menuFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 16,
    color: COLORS.danger,
    fontWeight: 'bold',
  }
});
