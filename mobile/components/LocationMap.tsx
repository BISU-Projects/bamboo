import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface LocationMapProps {
  locations?: {
    name: string;
    latitude: number;
    longitude: number;
    description?: string;
  }[];
  speciesName: string;
}

const LocationMap = ({ locations, speciesName }: LocationMapProps) => {
  const webViewRef = useRef<WebView>(null);

  if (!locations || locations.length === 0) {
    return (
      <View style={styles.noLocationContainer}>
        <MaterialCommunityIcons name="map-marker-off" size={48} color={Colors.textSecondary} />
        <Text style={styles.noLocationText}>
          No specific location data available for this species yet.
        </Text>
      </View>
    );
  }

  // Calculate center of all locations
  const centerLatitude = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
  const centerLongitude = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;

  // Generate HTML content for Leaflet
  const generateMapHtml = () => {
    const markersJson = JSON.stringify(locations.map(loc => ({
      lat: loc.latitude,
      lng: loc.longitude,
      name: loc.name,
      description: loc.description || `${speciesName} location`
    })));

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { 
            margin: 0; 
            padding: 0; 
          }
          #map { 
            height: 100vh; 
            width: 100vw; 
          }
          .leaflet-popup-content-wrapper {
            border-radius: 8px;
          }
          .leaflet-popup-content {
            margin: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .popup-title {
            font-weight: 600;
            font-size: 14px;
            color: #1a1a1a;
            margin-bottom: 4px;
          }
          .popup-description {
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          // Initialize map
          const map = L.map('map').setView([${centerLatitude}, ${centerLongitude}], 12);
          
          // Add OpenStreetMap tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
          }).addTo(map);

          // Custom marker icon (green)
          const customIcon = L.icon({
            iconUrl: 'data:image/svg+xml;base64,' + btoa(\`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                <path fill="#2E7D32" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            \`),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          });

          // Add markers
          const markers = ${markersJson};
          const bounds = [];

          markers.forEach(marker => {
            const m = L.marker([marker.lat, marker.lng], { icon: customIcon })
              .addTo(map)
              .bindPopup(\`
                <div class="popup-title">\${marker.name}</div>
                <div class="popup-description">\${marker.description}</div>
              \`);
            bounds.push([marker.lat, marker.lng]);
          });

          // Fit map to show all markers
          if (bounds.length > 1) {
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        </script>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.mapSection}>
      <WebView
        ref={webViewRef}
        style={styles.map}
        source={{ html: generateMapHtml() }}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      {/* Location List */}
      <View style={styles.locationListContainer}>
        <Text style={styles.locationListTitle}>Known Locations in Bohol:</Text>
        {locations.map((location, index) => (
          <View key={index} style={styles.locationItem}>
            <MaterialCommunityIcons name="map-marker" size={20} color={Colors.primary} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{location.name}</Text>
              {location.description && (
                <Text style={styles.locationDescription}>{location.description}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapSection: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  map: {
    width: '100%',
    height: 250,
  },
  locationListContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  locationListTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  noLocationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  noLocationText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
});

export default LocationMap;