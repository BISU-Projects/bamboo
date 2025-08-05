import React, { useEffect } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function HomeScreen() {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(15, {
        duration: 300,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, []);

  const waveStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotate.value}deg` }],
    };
  });

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.headerSurface} elevation={4}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      </Surface>

      <Surface style={styles.titleContainer} elevation={2}>
        <Text variant="headlineMedium">Welcome!</Text>
        <Animated.View style={waveStyle}>
          <Text style={{ fontSize: 32 }}>👋</Text>
        </Animated.View>
      </Surface>

      <Surface style={styles.stepContainer} elevation={1}>
        <Text variant="titleMedium">Step 1: Try it</Text>
        <Text>
          Edit <Text style={styles.bold}>app/(tabs)/index.tsx</Text> to see changes. Press{' '}
          <Text style={styles.bold}>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </Surface>

      <Surface style={styles.stepContainer} elevation={1}>
        <Text variant="titleMedium">Step 2: Explore</Text>
        <Text>
          Tap the Explore tab to learn more about what's included in this starter app.
        </Text>
      </Surface>

      <Surface style={styles.stepContainer} elevation={1}>
        <Text variant="titleMedium">Step 3: Get a fresh start</Text>
        <Text>
          When you're ready, run <Text style={styles.bold}>npm run reset-project</Text> to get a
          fresh <Text style={styles.bold}>app</Text> directory. This will move the current{' '}
          <Text style={styles.bold}>app</Text> to <Text style={styles.bold}>app-example</Text>.
        </Text>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerSurface: {
    height: 180,
    backgroundColor: '#A1CEDC',
    marginBottom: 16,
    position: 'relative',
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    gap: 8,
  },
  stepContainer: {
    padding: 12,
    marginBottom: 12,
    gap: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});
