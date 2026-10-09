import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Image, StatusBar, useWindowDimensions, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { farmStyles, COLORS } from '../../constants/farmStyles';
import { ActivityType, FarmLog, INITIAL_LOGS } from '../../constants/farmData';

const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const calculateTotalCost = (logs: FarmLog[]): number => {
  let total = 0;
  for (let i = 0; i < logs.length; i++) {
    total += logs[i].cost;
  }
  return total;
};

const getActivePlotsCount = (logs: FarmLog[]): number => {
  const plots = new Set<string>();
  for (let i = 0; i < logs.length; i++) {
    plots.add(logs[i].plotName);
  }
  return plots.size;
};

const getActivityBadgeStyle = (activity: ActivityType): { bg: string; text: string; icon: keyof typeof Ionicons.glyphMap } => {
  switch (activity) {
    case 'Pemupukan':
      return { bg: COLORS.primaryLight, text: COLORS.primaryDark, icon: 'leaf' };
    case 'Penyiraman':
      return { bg: COLORS.infoLight, text: COLORS.info, icon: 'water' };
    case 'Pengendalian Hama':
      return { bg: COLORS.dangerLight, text: COLORS.danger, icon: 'bug' };
    case 'Panen':
      return { bg: COLORS.warningLight, text: COLORS.warning, icon: 'basket' };
    case 'Olah Tanah':
      return { bg: '#F3E8FF', text: '#7E22CE', icon: 'earth' };
    default:
      return { bg: '#F1F5F9', text: '#475569', icon: 'document-text' };
  }
};

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  
  const filteredLogs = INITIAL_LOGS.filter(log => 
    log.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.plotName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCost = calculateTotalCost(INITIAL_LOGS);
  const activePlots = getActivePlotsCount(INITIAL_LOGS);

  const renderItem = ({ item }: { item: FarmLog }) => {
    const badgeStyle = getActivityBadgeStyle(item.activity);
    
    return (
      <View style={farmStyles.card}>
        <View style={[farmStyles.cardIconContainer, { backgroundColor: badgeStyle.bg }]}>
          <Ionicons name={badgeStyle.icon} size={isTablet ? 34 : 28} color={badgeStyle.text} />
        </View>

        <View style={farmStyles.cardContent}>
          <Text style={[farmStyles.cropTitle, { fontSize: isTablet ? 20 : 17 }]} numberOfLines={1}>
            {item.cropName}
          </Text>
          <View style={farmStyles.plotSubtitle}>
            <Ionicons name="location" size={14} color={COLORS.textMuted} />
            <Text style={{ color: COLORS.textMuted, fontSize: isTablet ? 15 : 13, marginLeft: 6, fontWeight: '600' }}>
              {item.plotName}
            </Text>
          </View>
        </View>

        <View style={farmStyles.costContainer}>
          <Text style={[farmStyles.badgeText, { backgroundColor: badgeStyle.bg, color: badgeStyle.text, fontSize: isTablet ? 13 : 11 }]}>
            {item.activity}
          </Text>
          <Text style={[farmStyles.costText, { fontSize: isTablet ? 18 : 16 }]}>
            {formatRupiah(item.cost)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={farmStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <View style={farmStyles.header}>

        {/* Profil & Sapaan */}
        <View style={farmStyles.headerRow}>
          <View>
            <Text style={[farmStyles.greeting, { fontSize: isTablet ? 20 : 16 }]}>Selamat Pagi,</Text>
            <Text style={[farmStyles.headerTitle, { fontSize: isTablet ? 36 : 28 }]}>Pak Budi 👋</Text>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' }} 
            style={[farmStyles.profileImage, isTablet && { width: 80, height: 80, borderRadius: 40 }]} 
            accessibilityLabel="Foto Profil"
          />
        </View>
      </View>

      {/* Summary Cards */}
      <View style={farmStyles.summaryContainer}>
        <View style={farmStyles.summaryCard}>
          <View style={[farmStyles.summaryIconContainer, { backgroundColor: COLORS.primaryLight }]}>
            <Ionicons name="wallet" size={24} color={COLORS.primaryDark} />
          </View>
          <Text style={[farmStyles.summaryLabel, { fontSize: isTablet ? 16 : 13 }]}>Total Biaya</Text>
          <Text style={[farmStyles.summaryValue, { fontSize: isTablet ? 28 : 22 }]}>{formatRupiah(totalCost)}</Text>
        </View>
        
        <View style={farmStyles.summaryCard}>
          <View style={[farmStyles.summaryIconContainer, { backgroundColor: COLORS.warningLight }]}>
            <MaterialCommunityIcons name="sprout" size={28} color={COLORS.warning} />
          </View>
          <Text style={[farmStyles.summaryLabel, { fontSize: isTablet ? 16 : 13 }]}>Lahan Aktif</Text>
          <Text style={[farmStyles.summaryValue, { color: COLORS.warning, fontSize: isTablet ? 28 : 22 }]}>{activePlots} Plot</Text>
        </View>
      </View>

      {/* Action Row */}
      <View style={farmStyles.actionRow}>
        <View style={farmStyles.searchInputContainer}>
          <Ionicons name="search" size={22} color={COLORS.textMuted} />
          <TextInput
            style={farmStyles.searchInput}
            placeholder="Cari aktivitas..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <Pressable 
          style={({ pressed }) => [
            farmStyles.addButton,
            pressed && { opacity: 0.8, transform: [{ scale: 0.92 }] }
          ]}
        >
          <Ionicons name="add" size={30} color="#FFFFFF" />
        </Pressable>
      </View>

      <Text style={[farmStyles.sectionTitle, { fontSize: isTablet ? 26 : 20 }]}>Aktivitas Terbaru</Text>

      {/* Farm Logs */}
      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={farmStyles.listContainer}
        showsVerticalScrollIndicator={false}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? 'tablet-list' : 'mobile-list'}
        columnWrapperStyle={isTablet ? { gap: 16 } : undefined}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="leaf-outline" size={60} color={COLORS.border} />
            <Text style={{ color: COLORS.textMuted, marginTop: 12, fontSize: 16, fontWeight: '600' }}>
              Tidak ada aktivitas.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
