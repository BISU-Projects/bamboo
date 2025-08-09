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
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

// Get status bar height
const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44; // Standard iOS status bar height
  } else {
    return RNStatusBar.currentHeight || 24; // Android status bar height
  }
};

interface PredictionResult {
  class?: string;
  confidence?: number;
  error?: string;
  [key: string]: any;
}

export default function Recognition() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const statusBarHeight = getStatusBarHeight();

  useEffect(() => {
    (async () => {
      // Request both camera and media library permissions
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== "granted" || mediaStatus !== "granted") {
        Alert.alert("Permissions required", "We need camera and photo library access to work properly!");
      }
      // Removed auto-opening camera - now user can choose
    })();
  }, []);

  const openCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
        setResult(null);
        sendToAPI(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Camera error:", error);
    }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setResult(null);
      sendToAPI(result.assets[0].uri);
    }
  };

  const sendToAPI = async (uri: string) => {
    try {
      setLoading(true);

      const filename = uri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1].toLowerCase()}` : "image";

      const formData = new FormData();
      // @ts-ignore
      formData.append("file", { uri, name: filename, type });

      const response = await fetch("https://f0f489672ca9.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const json = await response.json();
      setResult(json);
    } catch (error) {
      if (error instanceof Error) {
        setResult({ error: error.message });
      } else {
        setResult({ error: String(error) });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (result.error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>❌</Text>
          <Text style={styles.errorTitle}>Recognition Failed</Text>
          <Text style={styles.errorMessage}>{result.error}</Text>
        </View>
      );
    }

    const className = result.class || result.predicted_class || result.label || 'Unknown';
    const confidence = result.confidence || result.probability || result.score;

    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultIcon}>🎯</Text>
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
      {/* Fixed: Changed to light-content to show white text on dark background */}
      <StatusBar style="light" translucent />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header Section with proper status bar spacing */}
        <View style={styles.header}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.headerGradient, { paddingTop: statusBarHeight + 20 }]}
          >
            <Text style={styles.headerIcon}>📷</Text>
            <Text style={styles.title}>Bamboo Scanner</Text>
            <Text style={styles.subtitle}>AI-powered species identification</Text>
          </LinearGradient>
        </View>

        {/* Action Buttons - Now always visible */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, loading && styles.buttonDisabled]} 
            onPress={openCamera}
            disabled={loading}
          >
            <LinearGradient
              colors={loading ? ['#C7C7CC', '#C7C7CC'] : [Colors.primary, Colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonIcon}>📸</Text>
              <Text style={styles.primaryButtonText}>Take Photo</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.secondaryButton, loading && styles.buttonDisabled]} 
            onPress={pickImageFromGallery}
            disabled={loading}
          >
            <Text style={styles.buttonIcon}>🖼️</Text>
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

        {/* Tips Section */}
        {!selectedImage && !loading && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>📋 Tips for Better Results</Text>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Ensure good lighting conditions</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Focus on bamboo leaves and culms</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Get close for detailed features</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Avoid blurry or shadowed images</Text>
            </View>
          </View>
        )}
      </ScrollView>
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
  headerIcon: {
    fontSize: 48,
    marginBottom: 12,
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
  buttonIcon: {
    fontSize: 20,
    marginRight: 12,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resultIcon: {
    fontSize: 24,
    marginRight: 8,
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
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
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
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 8,
    fontWeight: '600',
  },
  tipText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
});