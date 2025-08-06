import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            borderTopWidth: 0,
            borderRadius: 24,
            marginHorizontal: 16,
            marginBottom: 34,
            height: 80,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 24,
            elevation: 8,
          },
          android: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderTopWidth: 0,
            borderRadius: 20,
            marginHorizontal: 12,
            marginBottom: 16,
            height: 70,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 12,
          },
          default: {
            backgroundColor: Colors.card,
            height: 65,
          },
        }),
        tabBarItemStyle: {
          paddingVertical: 8,
          borderRadius: 16,
          marginHorizontal: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
          letterSpacing: 0.5,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "home-circle" : "home-circle-outline"} 
              size={focused ? 26 : 24} 
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
                opacity: focused ? 1 : 0.8,
              }}
            />
          ),
          tabBarAccessibilityLabel: 'Home tab',
          tabBarButtonTestID: 'home-tab',
        }}
      />
      
      <Tabs.Screen
        name="recognition"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "camera" : "camera-outline"} 
              size={focused ? 26 : 24} 
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
                opacity: focused ? 1 : 0.8,
              }}
            />
          ),
          tabBarAccessibilityLabel: 'Camera recognition tab',
          tabBarButtonTestID: 'camera-tab',
        }}
      />
      
      <Tabs.Screen
        name="species"
        options={{
          title: 'Species',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "leaf-circle" : "leaf-circle-outline"} 
              size={focused ? 26 : 24} 
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
                opacity: focused ? 1 : 0.8,
              }}
            />
          ),
          tabBarAccessibilityLabel: 'Species information tab',
          tabBarButtonTestID: 'species-tab',
        }}
      />
    </Tabs>
  );
}