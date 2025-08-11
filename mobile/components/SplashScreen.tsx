import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
  Easing,
  interpolate,
} from 'react-native-reanimated';

interface SplashScreenProps {
  onFinish: () => void;
}

const BambooSegment = ({ delay, height }: { delay: number; height: number }) => {
  const progress = useSharedValue(0);
  const leafProgress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) })
    );
    
    leafProgress.value = withDelay(
      delay + 400,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) })
    );
  }, [delay]);

  const segmentStyle = useAnimatedStyle(() => {
    const animatedHeight = interpolate(progress.value, [0, 1], [0, height]);
    return {
      height: animatedHeight,
      opacity: progress.value,
    };
  });

  const leafStyle = useAnimatedStyle(() => {
    const scale = interpolate(leafProgress.value, [0, 1], [0, 1]);
    const rotate = interpolate(leafProgress.value, [0, 1], [-10, 0]);
    return {
      transform: [{ scale }, { rotate: `${rotate}deg` }],
      opacity: leafProgress.value,
    };
  });

  return (
    <View style={styles.segmentContainer}>
      <Animated.View style={[styles.bambooSegment, segmentStyle]}>
        <View style={styles.bambooNode} />
        <Animated.View style={[styles.leaf, styles.leafLeft, leafStyle]} />
        <Animated.View style={[styles.leaf, styles.leafRight, leafStyle]} />
      </Animated.View>
    </View>
  );
};

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const textOpacity = useSharedValue(0);
  const rootProgress = useSharedValue(0);

  useEffect(() => {
    // Show roots first
    rootProgress.value = withTiming(1, { duration: 500 });
    
    // Show text after bamboo starts growing
    textOpacity.value = withDelay(
      1000,
      withTiming(1, { duration: 800 })
    );

    // Finish animation after all segments have grown
    const totalDuration = 4000; // 4 seconds total
    setTimeout(() => {
      onFinish();
    }, totalDuration);
  }, []);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [
        {
          translateY: interpolate(textOpacity.value, [0, 1], [20, 0]),
        },
      ],
    };
  });

  const rootStyle = useAnimatedStyle(() => {
    const width = interpolate(rootProgress.value, [0, 1], [0, 100]);
    return {
      width,
      opacity: rootProgress.value,
    };
  });

  return (
    <>
      {/* Fixed Status Bar Configuration */}
      <StatusBar style="dark" />
      {/* Additional native status bar configuration for Android */}
      {Platform.OS === 'android' && (
        <RNStatusBar
          barStyle="dark-content"
          translucent={true}
        />
      )}
      
      <View style={styles.container}>
        <View style={styles.bambooContainer}>
          {/* Bamboo segments growing from bottom to top */}
          <BambooSegment delay={1800} height={40} />
          <BambooSegment delay={1400} height={45} />
          <BambooSegment delay={1000} height={50} />
          <BambooSegment delay={600} height={55} />
          <BambooSegment delay={200} height={60} />
          
          {/* Roots at the bottom */}
          <Animated.View style={[styles.roots, rootStyle]} />
        </View>
        
        <Animated.Text style={[styles.loadingText, textAnimatedStyle]}>
          BambooScope Image Recognition
        </Animated.Text>
        
        <Animated.Text style={[styles.subText, textAnimatedStyle]}>
          Loading, please wait...
        </Animated.Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  bambooContainer: {
    height: 250,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  segmentContainer: {
    alignItems: 'center',
  },
  bambooSegment: {
    width: 20,
    backgroundColor: '#4a7c59',
    borderRadius: 10,
    position: 'relative',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: '#3a5c49',
    borderRightColor: '#5a8c69',
  },
  bambooNode: {
    position: 'absolute',
    top: -2,
    left: -4,
    right: -4,
    height: 4,
    backgroundColor: '#2d4a35',
    borderRadius: 2,
    zIndex: 1,
  },
  leaf: {
    position: 'absolute',
    width: 25,
    height: 8,
    backgroundColor: '#6cb36f',
    borderRadius: 12,
    top: 10,
  },
  leafLeft: {
    left: -30,
    transform: [{ rotate: '-30deg' }],
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  leafRight: {
    right: -30,
    transform: [{ rotate: '30deg' }],
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  roots: {
    height: 3,
    backgroundColor: '#8b4513',
    borderRadius: 1.5,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d4a35',
    marginTop: 30,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#4a7c59',
    marginTop: 8,
    textAlign: 'center',
  },
});