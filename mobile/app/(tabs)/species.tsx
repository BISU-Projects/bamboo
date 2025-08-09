import React, { useState } from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View, 
  TouchableOpacity, 
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  FadeIn,
  Layout,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; // 2 columns with 16px margin and 16px gap

// Get status bar height
const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44; // Standard iOS status bar height
  } else {
    return RNStatusBar.currentHeight || 24; // Android status bar height
  }
};

interface BambooSpecies {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  height: string;
  category: 'Clumping' | 'Running' | 'Dwarf' | 'Timber';
  rarity: 'Common' | 'Uncommon' | 'Rare';
}

const sampleSpeciesData: BambooSpecies[] = [
  {
    id: '1',
    name: 'Giant Bamboo',
    scientificName: 'Dendrocalamus giganteus',
    image: '@/assets/images/bamboo-logo.png',
    height: '25-35m',
    category: 'Timber',
    rarity: 'Common',
  },
  {
    id: '2',
    name: 'Golden Bamboo',
    scientificName: 'Phyllostachys aurea',
    image: '@/assets/images/bamboo-logo.png',
    height: '6-10m',
    category: 'Running',
    rarity: 'Common',
  },
  {
    id: '3',
    name: 'Black Bamboo',
    scientificName: 'Phyllostachys nigra',
    image: '@/assets/images/bamboo-logo.png',
    height: '4-8m',
    category: 'Running',
    rarity: 'Uncommon',
  },
  {
    id: '4',
    name: 'Buddha Belly',
    scientificName: 'Bambusa ventricosa',
    image: '@/assets/images/bamboo-logo.png',
    height: '3-6m',
    category: 'Clumping',
    rarity: 'Uncommon',
  },
  {
    id: '5',
    name: 'Moso Bamboo',
    scientificName: 'Phyllostachys edulis',
    image: '@/assets/images/bamboo-logo.png',
    height: '15-25m',
    category: 'Timber',
    rarity: 'Common',
  },
];

export default function SpeciesScreen() {
  const router = useRouter();
  const statusBarHeight = getStatusBarHeight();

  const handleSpeciesPress = (species: BambooSpecies) => {
    // Navigate to species detail screen
    // router.push(`/species/${species.id}`);
    console.log('Opening species:', species.name);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return Colors.success;
      case 'Uncommon': return Colors.warning;
      case 'Rare': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const renderSpeciesCard = ({ item, index }: { item: BambooSpecies; index: number }) => (
    <Animated.View
      entering={FadeIn.delay(index * 100)}
      layout={Layout.springify()}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        onPress={() => handleSpeciesPress(item)}
        activeOpacity={0.8}
      >
        <Surface style={styles.speciesCard} elevation={2}>
          <View style={styles.imageContainer}>
            <Image
              source={require('@/assets/images/bamboo-logo.png')}
              style={styles.speciesImage}
              contentFit="cover"
              transition={300}
            />
            <View style={styles.rarityBadge}>
              <Text style={[styles.rarityText, { color: getRarityColor(item.rarity) }]}>
                {item.rarity}
              </Text>
            </View>
          </View>
          
          <View style={styles.cardContent}>
            <Text variant="titleSmall" style={styles.speciesName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text variant="bodySmall" style={styles.scientificName} numberOfLines={1}>
              {item.scientificName}
            </Text>
            
            <View style={styles.speciesInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>📏</Text>
                <Text style={styles.infoText}>{item.height}</Text>
              </View>
            </View>

            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </Surface>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text variant="headlineMedium" style={styles.headerTitle}>
        Bamboo Species
      </Text>
      <Text variant="bodyMedium" style={styles.headerSubtitle}>
        Explore {sampleSpeciesData.length} species in our database
      </Text>
    </View>
  );

  return (
    <>
      {/* Fixed: Changed to dark to show dark text/icons on light background */}
      <StatusBar style="dark" translucent />
      <View style={styles.container}>
        <FlatList
          data={sampleSpeciesData}
          renderItem={renderSpeciesCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { paddingTop: statusBarHeight + 16 }]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: 32,
  },
  
  // Header Styles
  headerContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  
  // Grid Styles
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  separator: {
    height: 16,
  },
  
  // Card Styles
  cardContainer: {
    width: itemWidth,
  },
  speciesCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  speciesImage: {
    width: '100%',
    height: '100%',
  },
  rarityBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  
  // Card Content
  cardContent: {
    padding: 12,
  },
  speciesName: {
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  scientificName: {
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 12,
    fontSize: 12,
  },
  speciesInfo: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    fontSize: 12,
    marginRight: 6,
    width: 16,
  },
  infoText: {
    color: Colors.textSecondary,
    fontSize: 12,
    flex: 1,
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '600',
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});