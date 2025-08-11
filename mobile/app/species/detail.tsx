import React, { useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Text, Surface, Chip, Divider } from 'react-native-paper';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withSpring,
  interpolate,
  Extrapolation,
  FadeIn,
  SlideInUp,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
// Import from centralized data source
import { getSpeciesById, BambooSpecies } from '@/data/species';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 300;
const CONTENT_OVERLAP = 40;

// Get status bar height
const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44;
  } else {
    return RNStatusBar.currentHeight || 24;
  }
};

export default function SpeciesDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const statusBarHeight = getStatusBarHeight();
  const scrollY = useSharedValue(0);
  
  // Get species data from centralized source
  const species = getSpeciesById(id || '1');
  
  // Fallback if species not found
  if (!species) {
    return (
      <View style={styles.container}>
        <Text>Species not found</Text>
      </View>
    );
  }

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT - 100],
      [1, 0],
      Extrapolation.CLAMP
    );
    
    const scale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [1, 1.2],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return Colors.success;
      case 'Uncommon': return Colors.warning;
      case 'Rare': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Timber': return '#8B4513';
      case 'Running': return '#228B22';
      case 'Clumping': return '#4169E1';
      case 'Dwarf': return '#FF8C00';
      default: return Colors.primary;
    }
  };

  return (
    <>
      <StatusBar style="light" />
      {Platform.OS === 'android' && (
        <RNStatusBar barStyle="light-content" translucent={true} />
      )}

      <View style={styles.container}>
        <Animated.ScrollView
          style={styles.scrollView}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Image Section */}
          <View style={styles.imageContainer}>
            <Animated.View style={[styles.imageWrapper, headerAnimatedStyle]}>
              <Image
                source={species.image} // Changed from hardcoded to dynamic image
                style={styles.heroImage}
                contentFit="cover"
                transition={500}
                // Add placeholder and error handling
                placeholder={require('@/assets/images/bamboo-logo.png')}
                placeholderContentFit="cover"
                onError={(error) => {
                  console.log('Image loading error:', error);
                }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageOverlay}
              />
            </Animated.View>
            
            {/* Back Button */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            
            {/* Image Content */}
            <Animated.View style={[styles.imageContent, headerAnimatedStyle]}>
              <View style={styles.badgeContainer}>
                <Chip
                  mode="flat"
                  style={[styles.rarityChip, { backgroundColor: getRarityColor(species.rarity) }]}
                  textStyle={styles.rarityChipText}
                >
                  {species.rarity}
                </Chip>
                <Chip
                  mode="flat"
                  style={[styles.categoryChip, { backgroundColor: getCategoryColor(species.category) }]}
                  textStyle={styles.categoryChipText}
                >
                  {species.category}
                </Chip>
              </View>
              
              <Text style={styles.speciesName}>{species.name}</Text>
              <Text style={styles.scientificName}>{species.scientificName}</Text>
              
              {/* <View style={styles.quickStats}>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="ruler" size={20} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.statText}>{species.height}</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.statText}>{species.origin}</Text>
                </View>
              </View> */}
            </Animated.View>
          </View>

          {/* Main Content */}
          <Animated.View 
            entering={SlideInUp.delay(200)}
            style={[styles.contentContainer, { marginTop: -CONTENT_OVERLAP }]}
          >
            <Surface style={styles.mainContent} elevation={4}>
              {/* Description Section */}
              <Animated.View entering={FadeIn.delay(300)} style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.description}>{species.description}</Text>
              </Animated.View>

              <Divider style={styles.divider} />

              {/* Growing Conditions */}
              <Animated.View entering={FadeIn.delay(400)} style={styles.section}>
                <Text style={styles.sectionTitle}>Growing Conditions</Text>
                <View style={styles.conditionsGrid}>
                  <View style={styles.conditionItem}>
                    <MaterialCommunityIcons name="weather-sunny" size={24} color={Colors.warning} />
                    <Text style={styles.conditionLabel}>Sunlight</Text>
                    <Text style={styles.conditionValue}>{species.sunlight}</Text>
                  </View>
                  <View style={styles.conditionItem}>
                    <MaterialCommunityIcons name="water" size={24} color={Colors.info} />
                    <Text style={styles.conditionLabel}>Water</Text>
                    <Text style={styles.conditionValue}>{species.water}</Text>
                  </View>
                  <View style={styles.conditionItem}>
                    <MaterialCommunityIcons name="thermometer" size={24} color={Colors.error} />
                    <Text style={styles.conditionLabel}>Temperature</Text>
                    <Text style={styles.conditionValue}>{species.temperature}</Text>
                  </View>
                  <View style={styles.conditionItem}>
                    <MaterialCommunityIcons name="speedometer" size={24} color={Colors.success} />
                    <Text style={styles.conditionLabel}>Growth Rate</Text>
                    <Text style={styles.conditionValue}>{species.growthRate}</Text>
                  </View>
                </View>
              </Animated.View>

              <Divider style={styles.divider} />

              {/* Characteristics */}
              <Animated.View entering={FadeIn.delay(500)} style={styles.section}>
                <Text style={styles.sectionTitle}>Key Characteristics</Text>
                <View style={styles.characteristicsList}>
                  {species.characteristics.map((characteristic, index) => (
                    <View key={index} style={styles.characteristicItem}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.characteristicText}>{characteristic}</Text>
                    </View>
                  ))}
                </View>
              </Animated.View>

              <Divider style={styles.divider} />

              {/* Uses */}
              <Animated.View entering={FadeIn.delay(600)} style={styles.section}>
                <Text style={styles.sectionTitle}>Common Uses</Text>
                <View style={styles.usesContainer}>
                  {species.uses.map((use, index) => (
                    <Chip
                      key={index}
                      mode="outlined"
                      style={styles.useChip}
                      textStyle={styles.useChipText}
                    >
                      {use}
                    </Chip>
                  ))}
                </View>
              </Animated.View>

              <Divider style={styles.divider} />

              {/* Care Instructions */}
              <Animated.View entering={FadeIn.delay(700)} style={styles.section}>
                <Text style={styles.sectionTitle}>Care Instructions</Text>
                <Text style={styles.careText}>{species.careInstructions}</Text>
              </Animated.View>

              {/* Additional Info */}
              <Animated.View entering={FadeIn.delay(800)} style={styles.section}>
                <Text style={styles.sectionTitle}>Additional Information</Text>
                <View style={styles.additionalInfo}>
                  {species.bloomingPeriod && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Blooming Period:</Text>
                      <Text style={styles.infoValue}>{species.bloomingPeriod}</Text>
                    </View>
                  )}
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Propagation:</Text>
                    <Text style={styles.infoValue}>{species.propagation}</Text>
                  </View>
                </View>
              </Animated.View>

              {/* Bottom Spacing */}
              <View style={styles.bottomSpacing} />
            </Surface>
          </Animated.View>
        </Animated.ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero Image Section
  imageContainer: {
    height: HEADER_HEIGHT,
    position: 'relative',
  },
  imageWrapper: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  
  // Back Button
  backButton: {
    position: 'absolute',
    top: getStatusBarHeight() + 10,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  
  imageContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  rarityChip: {
    alignSelf: 'flex-start',
  },
  rarityChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryChip: {
    alignSelf: 'flex-start',
  },
  categoryChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  speciesName: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scientificName: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  quickStats: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Content Container
  contentContainer: {
    flex: 1,
  },
  mainContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    minHeight: height - HEADER_HEIGHT + CONTENT_OVERLAP + 100,
  },

  // Sections
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  
  // Dividers
  divider: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: Colors.border,
  },

  // Growing Conditions
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  conditionItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  conditionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  conditionValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Characteristics
  characteristicsList: {
    gap: 12,
  },
  characteristicItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: 12,
    marginTop: 8,
  },
  characteristicText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },

  // Uses
  usesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  useChip: {
    backgroundColor: Colors.primarySoft,
    borderColor: Colors.primary,
  },
  useChipText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },

  // Care Instructions
  careText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },

  // Additional Info
  additionalInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    color: Colors.textSecondary,
    flex: 2,
    textAlign: 'right',
  },

  bottomSpacing: {
    height: 100,
  },
});