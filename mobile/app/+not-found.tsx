import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Colors } from '@/constants/Colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Surface style={styles.container}>
        <Text variant="headlineMedium" style={styles.titleText}>
          This screen does not exist.
        </Text>
        <Link href="/" style={styles.link}>
          <Text variant="labelLarge" style={styles.linkText}>
            Go to home screen!
          </Text>
        </Link>
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    elevation: 4,
    backgroundColor: Colors.background, 
  },
  titleText: {
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});
