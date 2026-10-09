import { StyleSheet, Platform } from 'react-native';

// Palet Warna Modern
export const COLORS = {
  primary: '#16A34A',
  primaryLight: '#DCFCE7',
  primaryDark: '#15803D',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
};

export const farmStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // --- Dashboard Header ---
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'ios' ? 60 : 45,
    paddingBottom: 70,
    paddingHorizontal: '6%',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  topNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  menuButton: {
    padding: 4,
  },
  navTitle: {
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
    fontWeight: '500',
  },
  headerTitle: {
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  // --- Summary Cards ---
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '4%',
    marginTop: -45,
    justifyContent: 'center',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    minWidth: 140, // Memastikan di tablet tidak melar terlalu ekstrem, melainkan wrap jika perlu
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  summaryIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryValue: {
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },

  // --- Search & Action Area ---
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginRight: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    width: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },

  // --- List Area ---
  sectionTitle: {
    fontWeight: '800',
    color: COLORS.text,
    marginHorizontal: '6%',
    marginTop: 32,
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: '6%',
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cropTitle: {
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  plotSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  costText: {
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },

  // --- Onboarding Styles ---
  onboardingContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  imageContainer: {
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },
  onboardingTitle: {
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 42,
  },
  onboardingDescription: {
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 5,
  },
  onboardingButtonContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: '10%',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.textMuted,
    fontWeight: '700',
  }
});
