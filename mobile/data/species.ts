// File: data/species.ts
export interface BambooSpecies {
  id: string;
  name: string;
  scientificName: string;
  image: string;
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
    name: 'Giant Bamboo',
    scientificName: 'Dendrocalamus giganteus',
    image: '@/assets/images/bamboo-logo.png',
    height: '25-35m',
    category: 'Timber',
    rarity: 'Common',
    origin: 'Southeast Asia',
    growthRate: 'Very Fast (up to 30cm/day)',
    sunlight: 'Full Sun to Partial Shade',
    water: 'High water requirements',
    temperature: '20-35°C (68-95°F)',
    description: 'Giant Bamboo is the largest bamboo species in the world, known for its impressive height and thick culms. It\'s highly valued for construction and commercial purposes due to its strength and rapid growth.',
    uses: ['Construction', 'Paper production', 'Furniture', 'Scaffolding', 'Handicrafts'],
    characteristics: [
      'Extremely tall with thick culms (15-20cm diameter)',
      'Rapid growth rate',
      'Strong and durable wood',
      'Large leaves with prominent veins',
      'Clumping growth habit'
    ],
    careInstructions: 'Requires well-drained, fertile soil with consistent moisture. Plant in sunny to partially shaded locations with protection from strong winds. Regular fertilization promotes optimal growth.',
    bloomingPeriod: 'Once every 40-80 years',
    propagation: 'Rhizome division, culm cuttings, or tissue culture'
  },
  {
    id: '2',
    name: 'Golden Bamboo',
    scientificName: 'Phyllostachys aurea',
    image: '@/assets/images/bamboo-logo.png',
    height: '6-10m',
    category: 'Running',
    rarity: 'Common',
    origin: 'China',
    growthRate: 'Fast (10-15cm/day)',
    sunlight: 'Full Sun to Partial Shade',
    water: 'Moderate water requirements',
    temperature: '10-30°C (50-86°F)',
    description: 'Golden Bamboo is a popular ornamental species known for its distinctive golden-yellow culms and dense foliage. It\'s widely cultivated as a privacy screen and decorative plant.',
    uses: ['Ornamental landscaping', 'Privacy screens', 'Fishing poles', 'Garden stakes', 'Small crafts'],
    characteristics: [
      'Golden-yellow culms that intensify with age',
      'Dense, running growth habit',
      'Cold tolerant',
      'Distinctive shortened internodes at base',
      'Fine, delicate leaves'
    ],
    careInstructions: 'Adaptable to various soil types but prefers well-drained conditions. Contains spread with root barriers for running varieties. Prune regularly to maintain desired shape.',
    bloomingPeriod: 'Once every 65-120 years',
    propagation: 'Rhizome division or culm cuttings'
  },
  {
    id: '3',
    name: 'Black Bamboo',
    scientificName: 'Phyllostachys nigra',
    image: '@/assets/images/bamboo-logo.png',
    height: '4-8m',
    category: 'Running',
    rarity: 'Uncommon',
    origin: 'China',
    growthRate: 'Moderate (5-10cm/day)',
    sunlight: 'Full Sun to Partial Shade',
    water: 'Moderate water requirements',
    temperature: '5-25°C (41-77°F)',
    description: 'Black Bamboo is prized for its striking ebony-black culms that develop their color over 2-3 years. It\'s a highly sought-after ornamental species for Asian-inspired gardens.',
    uses: ['Ornamental landscaping', 'Interior decoration', 'Floral arrangements', 'Traditional crafts', 'Garden accents'],
    characteristics: [
      'Culms turn from green to jet black with age',
      'Moderate running growth',
      'Excellent cold tolerance',
      'Graceful, arching form',
      'Small, refined leaves'
    ],
    careInstructions: 'Prefers slightly acidic, well-drained soil. Benefits from mulching and regular watering during dry periods. Best black coloration develops in full sun.',
    bloomingPeriod: 'Once every 120+ years',
    propagation: 'Rhizome division (best method for maintaining black coloration)'
  },
  {
    id: '4',
    name: 'Buddha Belly',
    scientificName: 'Bambusa ventricosa',
    image: '@/assets/images/bamboo-logo.png',
    height: '3-6m',
    category: 'Clumping',
    rarity: 'Uncommon',
    origin: 'Southern China',
    growthRate: 'Moderate (8-12cm/day)',
    sunlight: 'Full Sun to Partial Shade',
    water: 'Moderate water requirements',
    temperature: '15-30°C (59-86°F)',
    description: 'Buddha Belly Bamboo is famous for its distinctive swollen internodes that create a unique "belly" appearance. This ornamental bamboo is popular in bonsai and container growing.',
    uses: ['Ornamental landscaping', 'Bonsai cultivation', 'Container gardening', 'Indoor decoration', 'Artistic displays'],
    characteristics: [
      'Distinctive swollen internodes (belly shape)',
      'Compact clumping growth',
      'Excellent for containers',
      'Drought tolerant once established',
      'Unique architectural form'
    ],
    careInstructions: 'Thrives in well-draining soil with regular watering. Perfect for containers and can be grown indoors with adequate light. Prune to maintain desired shape and size.',
    bloomingPeriod: 'Once every 30-65 years',
    propagation: 'Division of clumps or culm cuttings'
  },
  {
    id: '5',
    name: 'Moso Bamboo',
    scientificName: 'Phyllostachys edulis',
    image: '@/assets/images/bamboo-logo.png',
    height: '15-25m',
    category: 'Timber',
    rarity: 'Common',
    origin: 'China and Japan',
    growthRate: 'Very Fast (up to 35cm/day)',
    sunlight: 'Full Sun to Partial Shade',
    water: 'Moderate to high water requirements',
    temperature: '5-35°C (41-95°F)',
    description: 'Moso Bamboo is one of the most economically important bamboo species, widely cultivated for timber, food (bamboo shoots), and paper production. It\'s known for its exceptional growth rate and versatility.',
    uses: ['Timber production', 'Bamboo shoots (food)', 'Paper manufacturing', 'Flooring', 'Construction materials'],
    characteristics: [
      'Large diameter culms (up to 20cm)',
      'Exceptional growth rate',
      'High-quality timber',
      'Edible young shoots',
      'Running growth pattern'
    ],
    careInstructions: 'Requires fertile, well-drained soil with consistent moisture. Benefits from regular fertilization. Control spread with barriers for running varieties. Harvest shoots in spring for best flavor.',
    bloomingPeriod: 'Once every 67-120 years',
    propagation: 'Rhizome division, culm cuttings, or seed (rare)'
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