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
  Dimensions
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get('window');

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

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setResult(null); // Clear previous results
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
          <Text style={styles.errorTitle}>❌ Error</Text>
          <Text style={styles.errorMessage}>{result.error}</Text>
        </View>
      );
    }

    // Handle different possible result formats
    const className = result.class || result.predicted_class || result.label || 'Unknown';
    const confidence = result.confidence || result.probability || result.score;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>🎯 Recognition Result</Text>
        
        <View style={styles.predictionCard}>
          <View style={styles.classSection}>
            <Text style={styles.classLabel}>Class:</Text>
            <Text style={styles.className}>{className}</Text>
          </View>
          
          {confidence !== undefined && (
            <View style={styles.confidenceSection}>
              <Text style={styles.confidenceLabel}>Confidence:</Text>
              <View style={styles.confidenceRow}>
                <Text style={styles.confidenceText}>
                  {(confidence * 100).toFixed(1)}%
                </Text>
                <View style={styles.confidenceBar}>
                  <View 
                    style={[
                      styles.confidenceBarFill, 
                      { width: `${confidence * 100}%` }
                    ]} 
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Show additional data if present */}
        {Object.keys(result).some(key => !['class', 'confidence', 'predicted_class', 'probability', 'score', 'label'].includes(key)) && (
          <View style={styles.additionalDataContainer}>
            <Text style={styles.additionalDataTitle}>Additional Information:</Text>
            {Object.entries(result).map(([key, value]) => {
              if (['class', 'confidence', 'predicted_class', 'probability', 'score', 'label'].includes(key)) {
                return null;
              }
              return (
                <View key={key} style={styles.dataRow}>
                  <Text style={styles.dataKey}>{key}:</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Image Recognition</Text>
        <Text style={styles.subtitle}>Upload an image to get AI predictions</Text>
      </View>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        </View>
      )}

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={pickImage}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {selectedImage ? "📷 Choose Different Image" : "📁 Pick an Image"}
        </Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Analyzing image...</Text>
        </View>
      )}

      {renderResult()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6E6E73',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: width - 40,
    height: 250,
    borderRadius: 16,
    backgroundColor: '#E5E5EA',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6E6E73',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 16,
    textAlign: 'center',
  },
  predictionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  classSection: {
    marginBottom: 16,
  },
  classLabel: {
    fontSize: 14,
    color: '#6E6E73',
    marginBottom: 4,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1F',
    textTransform: 'capitalize',
  },
  confidenceSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 16,
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#6E6E73',
    marginBottom: 8,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34C759',
    marginRight: 12,
    minWidth: 70,
  },
  confidenceBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  confidenceBarFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  additionalDataContainer: {
    backgroundColor: 'white',
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
    color: '#1D1D1F',
    marginBottom: 12,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  dataKey: {
    fontSize: 14,
    color: '#6E6E73',
    flex: 1,
    textTransform: 'capitalize',
  },
  dataValue: {
    fontSize: 14,
    color: '#1D1D1F',
    flex: 2,
    textAlign: 'right',
  },
  errorContainer: {
    backgroundColor: '#FF3B30',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
});