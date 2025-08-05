import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/animations/Loading.json')}
        autoPlay
        loop={false}
        style={styles.animation}
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled && onFinish) {
            onFinish();
          }
        }}
      />
      <Text style={styles.loadingText}>
        Bambo Image Recognition
      </Text>
      <Text style={styles.subText}>
        Loading, please wait...
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});