// File: data/species.ts
export interface BambooSpecies {
  id: string;
  name: string;
  scientificName: string;
  image: string; // Main hero image
  gallery: string[]; // Array of gallery images (5 images)
  height: string;
  category: 'Clumping' | 'Running' | 'Dwarf' | 'Timber';
  rarity: 'Common' | 'Uncommon' | 'Rare';
  origin: string;
  growthRate: string;
  sunlight: string;
  water: string;
  temperature: string;
  description: string;
  uses: string[];
  characteristics: string[];
  careInstructions: string;
  bloomingPeriod?: string;
  propagation: string;
}

export const sampleSpeciesData: BambooSpecies[] = [
  {
    id: '1',
    name: 'Bayog Bamboo',
    scientificName: 'Bambusa merrilliana',
    image: require('@/assets/images/bayog.jpg'), 
    gallery: [
      require('@/assets/images/bayog1.jpg'),
      require('@/assets/images/bayog2.jpg'),
      require('@/assets/images/bayog3.jpg'),
      require('@/assets/images/bayog4.jpg')
    ],
    height: 'up to 20 m',
    category: 'Clumping',
    rarity: 'Common',
    origin: 'Philippines',
    growthRate: 'Fast',
    sunlight: 'Full Sun to Partial Shade',
    water: 'Moderate to High (thrives near water bodies)',
    temperature: 'Tropical climates',
    description: 'Bayog is an endemic clumping bamboo of the Philippines, valued for its thick-walled, strong culms used extensively in traditional construction and crafts. Its culms are denser and more structurally reliable than many other bamboos.',
    uses: [
      'House construction (post-and-beam framing, nipa huts)',
      'Furniture',
      'Arched yoke for carabaos',
      'Ropes (split culms)',
      'Edible shoots',
      'Boat outriggers'
    ],
    characteristics: [
      'Clumping growth habit',
      'Culms up to 20 m tall, 8–12 cm diameter',
      'Thick-walled and strong; thin hollow core ("timber" bamboo)',
      'Dense nodes, aerial roots at lower nodes',
      'Flexible but durable, tolerates typhoons well'
    ],
    careInstructions: 'Best planted in well-drained, fertile soil with access to consistent moisture (ideal near riparian zones). Sun to partial shade. Propagate via culm cuttings; nursery-raised plants produce viable culms in ~3 years, with full clump maturity in ~7 years.',
    bloomingPeriod: 'Not well documented—rare or long bloom cycles typical of bamboos',
    propagation: 'Culm cuttings (high survival); nursery-raised and outplanted'
  },
  {
    id: '2',
    name: 'Bolo Bamboo',
    scientificName: 'Gigantochloa levis',
    image: require('@/assets/images/bolo.jpg'),
    gallery: [
      require('@/assets/images/bolo1.jpg'),
      require('@/assets/images/bolo2.jpg'),
      require('@/assets/images/bolo3.jpg'),
      require('@/assets/images/bolo4.jpg')
    ],
    height: '10–12 m',
    category: 'Clumping',
    rarity: 'Common',
    origin: 'Philippines',
    growthRate: 'Fast (typical of sympodial bamboos)',
    sunlight: 'Full Sun to Partial Shade',
    water: 'Moderate, prefers tropical, well-drained conditions',
    temperature: 'Tropical climates',
    description: 'Bolo is a sympodial (clumping) bamboo native to the Philippines and parts of Southeast Asia. It produces straight, dense culms commonly used in rural construction, aquatic applications, and as edible shoots.',
    uses: [
      'House construction',
      'Furniture',
      'Rafts and fish traps/fish pens',
      'Temporary water pipes',
      'Fencing',
      'Handicrafts',
      'Edible shoots'
    ],
    characteristics: [
      'Clumping (sympodial) growth habit',
      'Culms up to 10–12 m tall, 4–6 cm diameter',
      'Straight erect culms with hairy internodes',
      'Strong and versatile material'
    ],
    careInstructions: 'Propagate via culm or rhizome cuttings; plant in fertile, well-drained soil under full to partial sunlight. Maintain consistent moisture but avoid waterlogging. Growth is vigorous in tropical conditions.',
    bloomingPeriod: 'Flowering cycle unknown—likely long or gregarious like most bamboos',
    propagation: 'Culm cuttings and rhizome cuttings (commonly used)'
  },
  {
    id: '3',
    name: 'Golden Buho Bamboo',
    scientificName: 'Schizostachyum brachycladum',
    image: require('@/assets/images/golden_buho.jpg'),
    gallery: [
      require('@/assets/images/gb1.jpg'),
      require('@/assets/images/gb2.jpg'),
      require('@/assets/images/gb3.jpg'),
      require('@/assets/images/gb4.jpg')
    ],
    height: 'up to ~12 m',
    category: 'Clumping',
    rarity: 'Uncommon',
    origin: 'Philippines',
    growthRate: 'Fast (ornamental landscaping bamboo)',
    sunlight: 'Full Sun to Partial Shade',
    water: 'Moderate; ornamental use near ponds, gardens',
    temperature: 'Tropical to Subtropical climates',
    description: 'Golden Buho is a clumping bamboo recognized for its decorative yellow-green culms with green stripes. It\'s commonly used ornamentally as a border in water features, koi ponds, and Japanese-style gardens.',
    uses: [
      'Ornamental landscaping (pond borders, aesthetic plantings)',
      'Garden hedging/screening',
      'Fencing',
      'Edible shoots (young culms)'
    ],
    characteristics: [
      'Clumping (sympodial) growth habit',
      'Bright yellow culms with green stripes',
      'Leaves oblong-lanceolate, 15–40 cm long × 2.5–7 cm wide',
      'Visually striking in contrast with foliage'
    ],
    careInstructions: 'Plant in fertile, well-drained soil with regular moisture. Thrives under full sun to partial shade. Being clumping, it is manageable and stays neat—ideal for ornamental borders.',
    bloomingPeriod: 'Not documented; flowering cycles typically long and infrequent.',
    propagation: 'Division when clump reaches ~10 culms, splitting into ~5-culm offsets for transplanting.'
  },
  {
    id: '4',
    name: 'Iron Bamboo',
    scientificName: 'Guadua angustifolia',
    image: require('@/assets/images/iron_bamboo.jpg'),
    gallery: [
      require('@/assets/images/ib1.jpg'),
      require('@/assets/images/ib2.jpg'),
      require('@/assets/images/ib3.jpg'),
      require('@/assets/images/ib4.jpg')
    ],
    height: 'up to ~30 m',
    category: 'Running',
    rarity: 'Uncommon',
    origin: 'Colombia',
    growthRate: 'Very Fast',
    sunlight: 'Full Sun to Partial Shade',
    water: 'Moderate to High (thrives in humid, tropical environments)',
    temperature: 'Tropical climates',
    description: 'Iron Bamboo (Guadua angustifolia) is one of the largest and strongest bamboo species, often compared in strength to steel—valued for heavy-duty construction, engineered bamboo products, and structural applications.',
    uses: [
      'Heavy-duty construction (lumber, beams)',
      'Engineered bamboo (laminated beams, panels)',
      'Structural frameworks',
      'Paper and pulp manufacturing',
      'Reforestation and erosion control'
    ],
    characteristics: [
      'Running (monopodial) growth habit',
      'Culms up to ~30 m tall, 9–20 cm diameter',
      'Extremely strong with thick walls and high density',
      'Superior strength-to-weight ratio, durable'
    ],
    careInstructions: 'Plant in fertile, well-drained soils with abundant moisture. Prefers full to partial sun and tropical humidity. Being a running species, it should be managed to contain spread—regular harvesting and rhizome control advised.',
    bloomingPeriod: 'Not well documented; likely very infrequent flowering cycles',
    propagation: 'Culm cuttings and rhizome propagation—widely introduced as priority species in Philippine bamboo nurseries'
  },
  {
    id: '5',
    name: 'Kawayan Tinik Bamboo',
    scientificName: 'Bambusa blumeana',
    image: require('@/assets/images/kawayan_tinik.jpg'),
    gallery: [
      require('@/assets/images/kt1.jpg'),
      require('@/assets/images/kt2.jpg'),
      require('@/assets/images/kt3.jpg'),
      require('@/assets/images/kt4.jpg')
    ],
    height: '15–25 m',
    category: 'Clumping',
    rarity: 'Common',
    origin: 'Philippines',
    growthRate: 'Fast',
    sunlight: 'Full Sun to Partial Shade',
    water: 'Moderate; adaptable in erosion-prone sites',
    temperature: 'Tropical climates',
    description: 'Kawayan Tinik is a thorny, clumping bamboo valued for its thick-walled culms, used in construction, furniture, handicrafts, erosion control, and even edible shoots.',
    uses: [
      'Construction',
      'Furniture',
      'Basketry',
      'Parquet',
      'Concrete reinforcement',
      'Chopsticks, hats, toys',
      'Edible shoots',
      'Living fences and erosion barriers'
    ],
    characteristics: [
      'Dense clumping growth habit with spiny basal branches',
      'Culms 15–25 m tall with diameters of 6–10 cm',
      'Thick-walled, straight poles ideal for engineered bamboo',
      'Effective natural windbreak and erosion control'
    ],
    careInstructions: 'Plant in well-drained soil, ideally sandy or loamy. Apply regular crop management—cleaning, thinning, mulching, fertilization—for sustained yield.',
    bloomingPeriod: 'Not well documented; bamboo flowering cycles are typically long and infrequent.',
    propagation: 'One-node culm cuttings; PSAU reports ~64 % survival via two-node branch cuttings; treat clumps regularly via sanitation and cultural care.'
  }
];

// Helper function to get species by ID
export const getSpeciesById = (id: string): BambooSpecies | undefined => {
  return sampleSpeciesData.find(species => species.id === id);
};

// Helper function to get species by category
export const getSpeciesByCategory = (category: string): BambooSpecies[] => {
  return sampleSpeciesData.filter(species => species.category === category);
};

// Helper function to get species by rarity
export const getSpeciesByRarity = (rarity: string): BambooSpecies[] => {
  return sampleSpeciesData.filter(species => species.rarity === rarity);
};

// Helper function for search
export const searchSpecies = (query: string): BambooSpecies[] => {
  const lowercaseQuery = query.toLowerCase();
  return sampleSpeciesData.filter(species => 
    species.name.toLowerCase().includes(lowercaseQuery) ||
    species.scientificName.toLowerCase().includes(lowercaseQuery) ||
    species.category.toLowerCase().includes(lowercaseQuery) ||
    species.origin.toLowerCase().includes(lowercaseQuery)
  );
};

// Helper function to get all unique categories
export const getAllCategories = (): string[] => {
  const categories = sampleSpeciesData.map(species => species.category);
  return [...new Set(categories)].sort();
};

// Helper function to get all unique rarities
export const getAllRarities = (): string[] => {
  const rarities = sampleSpeciesData.map(species => species.rarity);
  return [...new Set(rarities)].sort();
};

// Helper function to get all unique origins
export const getAllOrigins = (): string[] => {
  const origins = sampleSpeciesData.map(species => species.origin);
  return [...new Set(origins)].sort();
};

// Helper function to get species count by category
export const getSpeciesCountByCategory = () => {
  const counts: { [key: string]: number } = {};
  sampleSpeciesData.forEach(species => {
    counts[species.category] = (counts[species.category] || 0) + 1;
  });
  return counts;
};

// Helper function to get species count by rarity
export const getSpeciesCountByRarity = () => {
  const counts: { [key: string]: number } = {};
  sampleSpeciesData.forEach(species => {
    counts[species.rarity] = (counts[species.rarity] || 0) + 1;
  });
  return counts;
};

// Helper function to get random species (for featured/recommended sections)
export const getRandomSpecies = (count: number = 3): BambooSpecies[] => {
  const shuffled = [...sampleSpeciesData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get species by multiple filters
export const getFilteredSpecies = (filters: {
  category?: string;
  rarity?: string;
  origin?: string;
  searchQuery?: string;
}): BambooSpecies[] => {
  let filtered = [...sampleSpeciesData];

  if (filters.category) {
    filtered = filtered.filter(species => species.category === filters.category);
  }

  if (filters.rarity) {
    filtered = filtered.filter(species => species.rarity === filters.rarity);
  }

  if (filters.origin) {
    filtered = filtered.filter(species => species.origin === filters.origin);
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(species => 
      species.name.toLowerCase().includes(query) ||
      species.scientificName.toLowerCase().includes(query) ||
      species.description.toLowerCase().includes(query) ||
      species.uses.some(use => use.toLowerCase().includes(query)) ||
      species.characteristics.some(char => char.toLowerCase().includes(query))
    );
  }

  return filtered;
};