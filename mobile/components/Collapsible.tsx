import { PropsWithChildren, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const iconColor = Colors.textPrimary;

  return (
    <Surface style={styles.container}>
      <TouchableRipple onPress={() => setIsOpen((prev) => !prev)} rippleColor="rgba(0, 0, 0, .1)">
        <View style={styles.heading}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={iconColor}
            style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableRipple>

      {isOpen && <View style={styles.content}>{children}</View>}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: Colors.card,
    borderRadius: 6,
    padding: 8,
    elevation: 2,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
