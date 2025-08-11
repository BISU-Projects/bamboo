import React, { useState, useEffect } from "react";
import { 
  View, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  Alert, 
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
  Modal,
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router'; // Add this import
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useApi } from '@/hooks/useAPI';
import { searchSpecies } from '@/data/species'; // Add this import

const { width } = Dimensions.get('window');

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44;
  } else {
    return RNStatusBar.currentHeight || 24;
  }
};

export default function Recognition() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [tipsType, setTipsType] = useState<'camera' | 'gallery'>('camera');
  const statusBarHeight = getStatusBarHeight();
  const router = useRouter(); // Add this
  
  const { result, loading, error, sendToAPI, clearResult } = useApi();

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== "granted" || mediaStatus !== "granted") {
        Alert.alert("Permissions required", "We need camera and photo library access to work properly!");
      }
    })();
  }, []);

  const showCameraTips = () => {
    setTipsType('camera');
    setShowTipsModal(true);
  };

  const showGalleryTips = () => {
    setTipsType('gallery');
    setShowTipsModal(true);
  };

  const proceedWithCamera = async () => {
    setShowTipsModal(false);
    // Small delay to ensure modal closes smoothly
    setTimeout(async () => {
      try {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
          setSelectedImage(result.assets[0].uri);
          clearResult();
          sendToAPI(result.assets[0].uri);
        }
      } catch (error) {
        console.log("Camera error:", error);
      }
    }, 300);
  };

  const proceedWithGallery = async () => {
    setShowTipsModal(false);
    setTimeout(async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
        clearResult();
        sendToAPI(result.assets[0].uri);
      }
    }, 300);
  };

  // Add this function to handle "See More" button press
  const handleSeeMore = () => {
    if (!result) return;
    
    const className = result.class || result.predicted_class || result.label || 'Unknown';
    
    // Search for the species in your database
    const foundSpecies = searchSpecies(className);
    
    if (foundSpecies.length > 0) {
      // If species found, navigate to detail page
      router.push({
        pathname: '/species/detail',
        params: { id: foundSpecies[0].id }
      });
    } else {
      // If species not found, show alert or do nothing
      Alert.alert(
        "Species Not Found",
        `"${className}" is not available in our species database yet.`,
        [{ text: "OK" }]
      );
    }
  };

  const getTipsContent = () => {
    if (tipsType === 'camera') {
      return {
        title: "📸 Camera Tips",
        tips: [
          "Hold your phone steady for clear shots",
          "Get close to capture bamboo details",
          "Focus on nodes, and culm features",
          "Use natural lighting when possible",
          "Avoid shadows on the bamboo"
        ]
      };
    } else {
      return {
        title: "🖼️ Gallery Tips",
        tips: [
          "Choose high-resolution images",
          "Select photos with clear bamboo features",
          "Avoid heavily cropped images",
          "Pick images with good contrast",
          "Ensure bamboo is the main subject"
        ]
      };
    }
  };

  const renderTipsModal = () => {
    const { title, tips } = getTipsContent();
    
    return (
      <Modal
        visible={showTipsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTipsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalSubtitle}>Follow these tips for better recognition results:</Text>
            
            <View style={styles.modalTipsContainer}>
              {tips.map((tip, index) => (
                <View key={index} style={styles.modalTipItem}>
                  <View style={styles.tipNumber}>
                    <Text style={styles.tipNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.modalTipText}>{tip}</Text>
                </View>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalSecondaryButton} 
                onPress={() => setShowTipsModal(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalPrimaryButton} 
                onPress={tipsType === 'camera' ? proceedWithCamera : proceedWithGallery}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryLight]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.modalButtonGradient}
                >
                  <Text style={styles.modalPrimaryButtonText}>
                    {tipsType === 'camera' ? 'Open' : 'Open'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderResult = () => {
    if (!result) return null;

    if (result.error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Recognition Failed</Text>
          <Text style={styles.errorMessage}>{result.error}</Text>
        </View>
      );
    }

    const className = result.class || result.predicted_class || result.label || 'Unknown';
    const confidence = result.confidence || result.probability || result.score;
    
    // Check if species exists in database
    const foundSpecies = searchSpecies(className);
    const hasSpeciesInfo = foundSpecies.length > 0;

    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>Recognition Result</Text>
        </View>
        
        <View style={styles.predictionCard}>
          <View style={styles.classSection}>
            <Text style={styles.classLabel}>Species Detected:</Text>
            <Text style={styles.className}>{className}</Text>
          </View>
          
          {confidence !== undefined && (
            <View style={styles.confidenceSection}>
              <Text style={styles.confidenceLabel}>Confidence Level:</Text>
              <View style={styles.confidenceRow}>
                <Text style={[
                  styles.confidenceText,
                  { color: confidence > 0.8 ? Colors.success : confidence > 0.6 ? Colors.warning : Colors.error }
                ]}>
                  {(confidence * 100).toFixed(1)}%
                </Text>
                <View style={styles.confidenceBar}>
                  <View 
                    style={[
                      styles.confidenceBarFill, 
                      { 
                        width: `${confidence * 100}%`,
                        backgroundColor: confidence > 0.8 ? Colors.success : confidence > 0.6 ? Colors.warning : Colors.error
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          )}

          {/* Add See More Button */}
          <View style={styles.seeMoreContainer}>
            <TouchableOpacity 
              style={[
                styles.seeMoreButton,
                !hasSpeciesInfo && styles.seeMoreButtonDisabled
              ]} 
              onPress={handleSeeMore}
              disabled={!hasSpeciesInfo}
            >
              <LinearGradient
                colors={hasSpeciesInfo ? [Colors.primary, Colors.primaryLight] : ['#C7C7CC', '#C7C7CC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.seeMoreButtonGradient}
              >
                <Text style={[
                  styles.seeMoreButtonText,
                  !hasSpeciesInfo && styles.seeMoreButtonTextDisabled
                ]}>
                  {hasSpeciesInfo ? 'See More Details' : 'No Additional Info Available'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {Object.keys(result).some(key => !['class', 'confidence', 'predicted_class', 'probability', 'score', 'label'].includes(key)) && (
          <View style={styles.additionalDataContainer}>
            <Text style={styles.additionalDataTitle}>Additional Information</Text>
            {Object.entries(result).map(([key, value]) => {
              if (['class', 'confidence', 'predicted_class', 'probability', 'score', 'label'].includes(key)) {
                return null;
              }
              return (
                <View key={key} style={styles.dataRow}>
                  <Text style={styles.dataKey}>{key.replace(/_/g, ' ')}:</Text>
                  <Text style={styles.dataValue}>{String(value)}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <StatusBar style="light" translucent />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.headerGradient, { paddingTop: statusBarHeight + 20 }]}
          >
            <Text style={styles.title}>Bamboo Scanner</Text>
            <Text style={styles.subtitle}>AI-powered species identification</Text>
          </LinearGradient>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, loading && styles.buttonDisabled]} 
            onPress={showCameraTips}
            disabled={loading}
          >
            <LinearGradient
              colors={loading ? ['#C7C7CC', '#C7C7CC'] : [Colors.primary, Colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Take Photo</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.secondaryButton, loading && styles.buttonDisabled]} 
            onPress={showGalleryTips}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          </View>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingCard}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.loadingTitle}>Analyzing Image</Text>
              <Text style={styles.loadingText}>Our AI is identifying the bamboo species...</Text>
            </View>
          </View>
        )}

        {renderResult()}

        {!selectedImage && !loading && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
            <Text style={styles.tipsDescription}>
              Get better recognition results by following our photography tips when you take or select photos.
            </Text>
          </View>
        )}
      </ScrollView>
      
      {renderTipsModal()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textInverse,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textInverse,
    opacity: 0.9,
    textAlign: 'center',
  },
  imageContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  selectedImage: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.surface,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.surface,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: Colors.textInverse,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  loadingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  resultContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  predictionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  classSection: {
    marginBottom: 20,
  },
  classLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 6,
    fontWeight: '500',
  },
  className: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    textTransform: 'capitalize',
  },
  confidenceSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
    marginBottom: 20,
  },
  confidenceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 10,
    fontWeight: '500',
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 16,
    minWidth: 70,
  },
  confidenceBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  confidenceBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  // Add new styles for See More button
  seeMoreContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
  },
  seeMoreButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  seeMoreButtonDisabled: {
    opacity: 0.6,
  },
  seeMoreButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  seeMoreButtonText: {
    color: Colors.textInverse,
    fontSize: 16,
    fontWeight: '600',
  },
  seeMoreButtonTextDisabled: {
    color: Colors.textSecondary,
  },
  additionalDataContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  additionalDataTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dataKey: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  dataValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.error,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.error,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  tipsContainer: {
    marginHorizontal: 16,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  tipsDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalTipsContainer: {
    marginBottom: 24,
  },
  modalTipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  tipNumberText: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: '600',
  },
  modalTipText: {
    fontSize: 15,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalSecondaryButton: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  modalPrimaryButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  modalSecondaryButtonText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  modalPrimaryButtonText: {
    color: Colors.textInverse,
    fontSize: 16,
    fontWeight: '600',
  },
});