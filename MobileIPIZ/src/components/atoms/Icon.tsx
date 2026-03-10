// IPIZ Mobile App - Atomic Icon Component
// Simple icon component using Unicode symbols as fallback

import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

type IconName = 
  | 'home' | 'academic' | 'notification' | 'profile' | 'settings'
  | 'search' | 'menu' | 'back' | 'close' | 'check' | 'add' | 'remove'
  | 'chevron-right' | 'chevron-down' | 'filter' | 'sort' | 'more'
  | 'user' | 'bell' | 'calendar' | 'book' | 'grade' | 'announcement'
  | 'job' | 'briefcase' | 'certificate' | 'mentor' | 'logout'
  | 'edit' | 'delete' | 'visibility' | 'visibility-off';

type IconSize = 'sm' | 'md' | 'lg';

interface Props {
  name: IconName;
  size?: IconSize;
  color?: string;
}

// Unicode icon mappings (simple fallback icons)
const iconMap: Record<IconName, string> = {
  home: '\u2302',
  academic: '\u{1F4DA}',
  notification: '\u{1F514}',
  profile: '\u{1F464}',
  settings: '\u{2699}',
  search: '\u{1F50D}',
  menu: '\u{2630}',
  back: '\u2190',
  close: '\u2715',
  check: '\u2713',
  add: '+',
  remove: '\u2212',
  'chevron-right': '\u203A',
  'chevron-down': '\u203A',
  filter: '\u{1F50D}',
  sort: '\u2195}',
  more: '\u22EE',
  user: '\u{1F464}',
  bell: '\u{1F514}',
  calendar: '\u{1F4C5}',
  book: '\u{1F4D6}',
  grade: '\u{1F4DD}',
  announcement: '\u{1F4E4}',
  job: '\u{1F4BC}',
  briefcase: '\u{1F4BC}',
  certificate: '\u{1F4C4}',
  mentor: '\u{1F465}',
  logout: '\u{1F6D1}',
  edit: '\u270E',
  delete: '\u{1F5D1}',
  visibility: '\u{1F441}',
  'visibility-off': '\u{1F648}',
};

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const Icon: FC<Props> = ({ name, size = 'md', color }) => {
  const { colors } = useTheme();
  const resolvedColor = color ?? colors.text.primary;

  return (
    <View style={[styles.container, { width: sizeMap[size], height: sizeMap[size] }]}>
      <Text style={[styles.icon, { fontSize: sizeMap[size], color: resolvedColor }]}>
        {iconMap[name] || '\u25CF'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});

export default Icon;

