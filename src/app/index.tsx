import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, ActivityIndicator, FlatList, Pressable,
  NativeSyntheticEvent, NativeScrollEvent, SafeAreaView, Animated,
  useWindowDimensions, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { farmStyles, COLORS } from '../constants/farmStyles';

const SLIDES = [
  {
    id: '1',
    title: 'Pantau\nLahan Anda',
    description: 'Catat setiap aktivitas pertanian dengan mudah. Platform modern untuk petani masa kini.',
    icon: 'leaf',
  },
  {
    id: '2',
    title: 'Analitik\nPengeluaran',
    description: 'Kalkulasi otomatis biaya pupuk, bibit, dan pestisida untuk memantau keuangan Anda.',
    icon: 'pie-chart',
  },
  {
    id: '3',
    title: 'Mulai\nSekarang',
    description: 'Tingkatkan produktivitas dan hasil panen dengan Jurnal Tani.',
    icon: 'rocket',
    isLogin: true,
  }
];

export default function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = width >= 768;
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  const [scrollX] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item, index }: { item: typeof SLIDES[0], index: number }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    // Dimensi adaptif untuk gambar/ikon
    const imageSize = isLandscape ? height * 0.4 : (isTablet ? width * 0.5 : width * 0.75);

    return (
      <View style={[farmStyles.slideContainer, { width }]}>
        <ScrollView 
          contentContainerStyle={{ 
            flexGrow: 1, 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingTop: isLandscape ? 20 : (isTablet ? 60 : 80),
            paddingBottom: 150 // Ruang aman untuk tombol
          }} 
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[
            farmStyles.imageContainer, 
            { 
              width: imageSize, 
              height: imageSize, 
              borderRadius: imageSize / 2,
              marginBottom: isLandscape ? 24 : 60,
              transform: [{ scale }] 
            }
          ]}>
            <Ionicons name={item.icon as any} size={imageSize * 0.45} color={COLORS.primary} />
          </Animated.View>
          
          <Text style={[farmStyles.onboardingTitle, { fontSize: isTablet ? 42 : (isLandscape ? 28 : 34) }]}>
            {item.title}
          </Text>
          <Text style={[farmStyles.onboardingDescription, { fontSize: isTablet ? 20 : 16 }]}>
            {item.description}
          </Text>
        </ScrollView>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={[farmStyles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.surface }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 24, fontSize: 18, fontWeight: '700', color: COLORS.primary }}>
          Memuat Jurnal Tani...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={farmStyles.onboardingContainer}>
      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
        bounces={false}
      />
      
      {/* Pagination Adaptif */}
      <View style={[farmStyles.paginationContainer, { bottom: isLandscape ? 100 : 140 }]}>
        {SLIDES.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 30, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View 
              key={index} 
              style={[farmStyles.dot, { width: dotWidth, opacity, backgroundColor: COLORS.primary }]} 
            />
          );
        })}
      </View>

      {/* Button Area Adaptif */}
      <View style={[
        farmStyles.onboardingButtonContainer, 
        { bottom: isLandscape ? 20 : 40 },
        isTablet && { paddingHorizontal: '20%' } // Tombol tidak terlalu memanjang di tablet
      ]}>
        {currentIndex === SLIDES.length - 1 ? (
          <Animated.View style={{ opacity: scrollX.interpolate({
            inputRange: [(SLIDES.length - 2) * width, (SLIDES.length - 1) * width],
            outputRange: [0, 1],
            extrapolate: 'clamp'
          })}}>
            <Pressable 
              style={({ pressed }) => [farmStyles.primaryButton, pressed && { opacity: 0.9, transform: [{ scale: 0.97 }] }]}
              onPress={() => router.replace('/(auth)/register' as any)}
            >
              <Text style={[farmStyles.primaryButtonText, { fontSize: isTablet ? 22 : 18 }]}>Mulai Jelajahi</Text>
            </Pressable>
            <Pressable 
              style={({ pressed }) => [farmStyles.secondaryButton, pressed && { opacity: 0.5 }]}
              onPress={() => router.replace('/(auth)/login' as any)}
            >
              <Text style={[farmStyles.secondaryButtonText, { fontSize: isTablet ? 18 : 16 }]}>Sudah punya akun? Masuk</Text>
            </Pressable>
          </Animated.View>
        ) : (
          <Pressable 
            style={({ pressed }) => [farmStyles.primaryButton, pressed && { opacity: 0.9, transform: [{ scale: 0.97 }] }]}
            onPress={() => {
              flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
            }}
          >
            <Text style={[farmStyles.primaryButtonText, { fontSize: isTablet ? 22 : 18 }]}>Lanjut</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
