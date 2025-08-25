import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
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
            backgroundColor: 'white',
            borderTopWidth: 0,
            marginBottom: 0,
            height: 80,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
          },
          android: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            marginBottom: 0,
            height: 70,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 12,
          },
          default: {
            backgroundColor: 'white',
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
            <Text style={{
              fontSize: 24,
              color: color,
              opacity: focused ? 1 : 0.8,
            }}>
              🏠
            </Text>
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
            <Text style={{
              fontSize: 24,
              color: color,
              opacity: focused ? 1 : 0.8,
            }}>
              📸
            </Text>
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
            <Text style={{
              fontSize: 24,
              color: color,
              opacity: focused ? 1 : 0.8,
            }}>
              🌿
            </Text>
          ),
          tabBarAccessibilityLabel: 'Species information tab',
          tabBarButtonTestID: 'species-tab',
        }}
      />
    </Tabs>
  );
}