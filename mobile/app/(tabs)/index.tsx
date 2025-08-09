import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  TouchableOpacity,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Text, Surface, Chip } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

// Get status bar height
const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44; // Standard iOS status bar height
  } else {
    return RNStatusBar.currentHeight || 24; // Android status bar height
  }
};

export default function HomeScreen() {
  const router = useRouter();
  const statusBarHeight = getStatusBarHeight();
  const sway = useSharedValue(0);
  const fadeIn = useSharedValue(0);

  useEffect(() => {
    sway.value = withRepeat(
      withTiming(8, {
        duration: 2000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );
    fadeIn.value = withTiming(1, { duration: 700 });
  }, []);

  const bambooSwayStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${sway.value}deg` }],
    };
  });

  const fadeInStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
    };
  });

  const handleScanBamboo = () => {
    // Navigate to Camera tab
    router.push('/(tabs)/recognition');
  };

  const handleExploreSpecies = () => {
    // Navigate to Species tab
   router.push('/(tabs)/species');
  };

  return (
    <>
      <StatusBar style="auto" translucent />
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Header with Gradient */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradientHeader, { paddingTop: statusBarHeight + 40 }]}
          >
            <Animated.View style={[styles.logoContainer, fadeInStyle]}>
              <Animated.View style={bambooSwayStyle}>
                <Text style={styles.bambooIcon}>🎋</Text>
              </Animated.View>
              <Text style={styles.appName}>BamboScope</Text>
              <Text style={styles.tagline}>AI-Powered Bamboo Recognition</Text>
              <Chip 
                mode="outlined" 
                style={styles.versionChip}
                textStyle={styles.versionText}
              >
                v1.0 Beta
              </Chip>
            </Animated.View>
          </LinearGradient>
        </View>

        {/* Stats Overview */}
        <Animated.View style={[styles.statsContainer, fadeInStyle]}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Species</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Scans</Text>
          </View>
        </Animated.View>

        {/* Welcome Message */}
        <Animated.View style={fadeInStyle}>
          <Surface style={styles.welcomeContainer} elevation={0}>
            <Text variant="headlineSmall" style={styles.welcomeTitle}>
              Discover Bamboo Species
            </Text>
            <Text variant="bodyMedium" style={styles.welcomeText}>
              Point your camera at any bamboo plant for instant AI-powered species identification with detailed botanical information.
            </Text>
          </Surface>
        </Animated.View>

        {/* Quick Actions with Modern Cards */}
        <Animated.View style={[styles.quickActionsContainer, fadeInStyle]}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Get Started
          </Text>
          
          <TouchableOpacity onPress={handleScanBamboo} activeOpacity={0.8}>
            <Surface style={styles.primaryActionCard} elevation={2}>
              <LinearGradient
                colors={[Colors.primary, Colors.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardGradient}
              >
                <View style={styles.actionIcon}>
                  <Text style={styles.primaryActionEmoji}>📸</Text>
                </View>
                <View style={styles.actionTextContainer}>
                  <Text variant="titleMedium" style={styles.primaryActionTitle}>
                    Scan Bamboo
                  </Text>
                  <Text variant="bodySmall" style={styles.primaryActionDescription}>
                    Instant AI recognition • High accuracy
                  </Text>
                </View>
                <View style={styles.actionArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </LinearGradient>
            </Surface>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleExploreSpecies} activeOpacity={0.8}>
            <Surface style={styles.secondaryActionCard} elevation={1}>
              <View style={styles.actionContent}>
                <View style={styles.secondaryActionIcon}>
                  <Text style={styles.actionEmoji}>🌿</Text>
                </View>
                <View style={styles.actionTextContainer}>
                  <Text variant="titleMedium" style={styles.actionTitle}>
                    Explore Database
                  </Text>
                  <Text variant="bodySmall" style={styles.actionDescription}>
                    Browse 500+ bamboo species
                  </Text>
                </View>
                <View style={styles.actionArrow}>
                  <Text style={styles.secondaryArrowIcon}>→</Text>
                </View>
              </View>
            </Surface>
          </TouchableOpacity>
        </Animated.View>

        {/* Feature Grid */}
        <Animated.View style={[styles.featuresContainer, fadeInStyle]}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Why BamboScope?
          </Text>
          
          <View style={styles.featureGrid}>
            <Surface style={styles.featureCard} elevation={1}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>🤖</Text>
              </View>
              <Text variant="titleSmall" style={styles.featureTitle}>
                AI-Powered
              </Text>
              <Text variant="bodySmall" style={styles.featureDescription}>
                Advanced deep learning for precise identification
              </Text>
            </Surface>

            <Surface style={styles.featureCard} elevation={1}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>⚡</Text>
              </View>
              <Text variant="titleSmall" style={styles.featureTitle}>
                Instant Results
              </Text>
              <Text variant="bodySmall" style={styles.featureDescription}>
                Get species info in under 3 seconds
              </Text>
            </Surface>

            <Surface style={styles.featureCard} elevation={1}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>📚</Text>
              </View>
              <Text variant="titleSmall" style={styles.featureTitle}>
                Rich Database
              </Text>
              <Text variant="bodySmall" style={styles.featureDescription}>
                Comprehensive botanical information
              </Text>
            </Surface>

            <Surface style={styles.featureCard} elevation={1}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>🌍</Text>
              </View>
              <Text variant="titleSmall" style={styles.featureTitle}>
                Global Coverage
              </Text>
              <Text variant="bodySmall" style={styles.featureDescription}>
                Species from around the world
              </Text>
            </Surface>
          </View>
        </Animated.View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroContainer: {
    marginBottom: 0,
  },
  gradientHeader: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bambooIcon: {
    fontSize: 72,
    marginBottom: 12,
  },
  appName: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.textInverse,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textInverse,
    opacity: 0.9,
    fontWeight: '500',
    marginBottom: 16,
  },
  versionChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  versionText: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Stats Section
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },

  // Welcome Section
  welcomeContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 24,
    backgroundColor: Colors.surface,
    borderRadius: 16,
  },
  welcomeTitle: {
    color: Colors.textPrimary,
    marginBottom: 12,
    fontWeight: '600',
  },
  welcomeText: {
    color: Colors.textSecondary,
    lineHeight: 22,
    fontSize: 16,
  },

  // Quick Actions
  quickActionsContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 18,
  },
  
  // Primary Action Card
  primaryActionCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryActionEmoji: {
    fontSize: 32,
  },
  primaryActionTitle: {
    color: Colors.textInverse,
    fontWeight: '600',
    marginBottom: 4,
  },
  primaryActionDescription: {
    color: Colors.textInverse,
    opacity: 0.9,
  },
  
  // Secondary Action Card
  secondaryActionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  secondaryActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionEmoji: {
    fontSize: 28,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDescription: {
    color: Colors.textSecondary,
  },
  actionArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    color: Colors.textInverse,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryArrowIcon: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },

  // Features Grid
  featuresContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    textAlign: 'center',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  
  bottomSpacing: {
    height: 32,
  },
});