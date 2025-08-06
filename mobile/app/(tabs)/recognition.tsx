import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.background, dark: Colors.primaryDark }}
      headerImage={
        <IconSymbol
          size={310}
          color={Colors.textSecondary}
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <Surface style={styles.titleContainer}>
        <Text variant="headlineMedium" style={styles.titleText}>
          Explore
        </Text>
      </Surface>

      <Text style={styles.paragraph}>
        This app includes example code to help you get started.
      </Text>

      <Collapsible title="File-based routing">
        <Text style={styles.paragraph}>
          This app has two screens: <Text style={styles.semiBold}>app/(tabs)/index.tsx</Text> and{' '}
          <Text style={styles.semiBold}>app/(tabs)/explore.tsx</Text>
        </Text>
        <Text style={styles.paragraph}>
          The layout file in <Text style={styles.semiBold}>app/(tabs)/_layout.tsx</Text> sets up the tab navigator.
        </Text>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text style={styles.link}>Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Android, iOS, and web support">
        <Text style={styles.paragraph}>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <Text style={styles.semiBold}>w</Text> in the terminal running this project.
        </Text>
      </Collapsible>

      <Collapsible title="Images">
        <Text style={styles.paragraph}>
          For static images, you can use the <Text style={styles.semiBold}>@2x</Text> and{' '}
          <Text style={styles.semiBold}>@3x</Text> suffixes to provide files for different screen densities.
        </Text>
        <Image source={require('@/assets/images/react-logo.png')} style={styles.image} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Text style={styles.link}>Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Custom fonts">
        <Text style={styles.paragraph}>
          Open <Text style={styles.semiBold}>app/_layout.tsx</Text> to see how to load{' '}
          <Text style={styles.customFont}>custom fonts such as this one.</Text>
        </Text>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <Text style={styles.link}>Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Light and dark mode components">
        <Text style={styles.paragraph}>
          This template has light and dark mode support. The{' '}
          <Text style={styles.semiBold}>useColorScheme()</Text> hook lets you inspect what the user's current color
          scheme is, and so you can adjust UI colors accordingly.
        </Text>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Text style={styles.link}>Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Animations">
        <Text style={styles.paragraph}>
          This template includes an example of an animated component. The{' '}
          <Text style={styles.semiBold}>components/HelloWave.tsx</Text> component uses the powerful{' '}
          <Text style={styles.semiBold}>react-native-reanimated</Text> library to create a waving hand animation.
        </Text>
        {Platform.select({
          ios: (
            <Text style={styles.paragraph}>
              The <Text style={styles.semiBold}>components/ParallaxScrollView.tsx</Text> component provides a parallax
              effect for the header image.
            </Text>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: Colors.textSecondary,
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  titleText: {
    color: Colors.primaryDark,
  },
  paragraph: {
    color: Colors.textPrimary,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  semiBold: {
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  customFont: {
    fontFamily: 'SpaceMono',
    color: Colors.textPrimary,
  },
  link: {
    color: Colors.primary,
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  image: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});
