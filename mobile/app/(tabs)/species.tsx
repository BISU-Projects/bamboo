import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
  TextInput,
  ScrollView
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { sampleSpeciesData, BambooSpecies } from '@/data/species';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') return 44;
  return RNStatusBar.currentHeight || 24;
};

export default function SpeciesScreen() {
  const router = useRouter();
  const statusBarHeight = getStatusBarHeight();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const rarityOptions = ['Common', 'Uncommon', 'Rare'];
  const categoryOptions = ['Timber', 'Running', 'Clumping', 'Dwarf'];

  const filteredData = useMemo(() => {
    if (!searchQuery && !selectedRarity && !selectedCategory) {
      return sampleSpeciesData;
    }
    const lowerQuery = searchQuery.toLowerCase();
    return sampleSpeciesData.filter(species => {
      const matchesSearch =
        species.name.toLowerCase().includes(lowerQuery) ||
        species.scientificName.toLowerCase().includes(lowerQuery);
      const matchesRarity = !selectedRarity || species.rarity === selectedRarity;
      const matchesCategory = !selectedCategory || species.category === selectedCategory;
      return matchesSearch && matchesRarity && matchesCategory;
    });
  }, [searchQuery, selectedRarity, selectedCategory]);

  const handleSpeciesPress = (species: BambooSpecies) => {
    router.push({
      pathname: '/species/detail',
      params: { id: species.id }
    });
  };

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

  const renderSpeciesCard = ({ item, index }: { item: BambooSpecies; index: number }) => (
    <Animated.View
      entering={FadeIn.delay(index * 50)}
      layout={Layout.springify()}
      style={styles.cardContainer}
    >
      <TouchableOpacity onPress={() => handleSpeciesPress(item)} activeOpacity={0.8}>
        <Surface style={styles.speciesCard} elevation={2}>
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
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
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>🌍</Text>
                <Text style={styles.infoText} numberOfLines={1}>{item.origin}</Text>
              </View>
            </View>
            <Text style={[
              styles.categoryText,
              {
                backgroundColor: getCategoryColor(item.category) + '20',
                borderColor: getCategoryColor(item.category),
                color: getCategoryColor(item.category)
              }
            ]}>
              {item.category}
            </Text>
          </View>
        </Surface>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <>
      <StatusBar style="dark" />
      {Platform.OS === 'android' && (
        <RNStatusBar barStyle="dark-content" translucent={true} />
      )}

      <View style={styles.container}>
        {/* Modern sticky top section */}
        <View style={[styles.topSection, { paddingTop: statusBarHeight + 8 }]}>
          <Text style={styles.headerTitle}>Bamboo Species</Text>
          <Text style={styles.headerSubtitle}>
            Showing {filteredData.length} of {sampleSpeciesData.length} species
          </Text>

          <TextInput
            placeholder="Search species..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor={Colors.textSecondary}
            autoCorrect={false}
            autoCapitalize="none"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={{ paddingRight: 8 }}
          >
            {rarityOptions.map(r => (
              <TouchableOpacity
                key={r}
                style={[
                  styles.filterChip,
                  selectedRarity === r && styles.filterChipSelected
                ]}
                onPress={() => setSelectedRarity(selectedRarity === r ? null : r)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedRarity === r && styles.filterChipTextSelected
                  ]}
                >
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
            {categoryOptions.map(c => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.filterChip,
                  selectedCategory === c && styles.filterChipSelected
                ]}
                onPress={() => setSelectedCategory(selectedCategory === c ? null : c)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCategory === c && styles.filterChipTextSelected
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderSpeciesCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={filteredData.length > 1 ? styles.row : null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
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
  topSection: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 4,
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 14,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
    backgroundColor: Colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      }
    })
  },
  filterChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    color: Colors.textPrimary,
  },
  filterChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  separator: {
    height: 16,
  },
  cardContainer: {
    width: itemWidth,
    marginBottom: 16,
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
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    overflow: 'hidden',
  },
});
