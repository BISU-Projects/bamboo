import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import 'react-native-reanimated';


import SplashScreen from '@/components/SplashScreen'; 

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  // Show splash screen while fonts are loading OR while splash animation is playing
  if (!loaded || showSplash) {
    // If fonts aren't loaded yet, don't show splash screen component
    if (!loaded) {
      return null;
    }
    
    // Fonts are loaded, show splash screen
    return (
      <SplashScreen 
        onFinish={() => {
          console.log('Splash screen finished');
          setShowSplash(false);
        }} 
      />
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}