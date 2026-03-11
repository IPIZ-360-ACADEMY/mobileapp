// IPIZ Mobile App - Molecule SectionHeader Component with Tailwind CSS
// Simple heading for sections to keep UI consistent

import React, { FC } from 'react';
import { Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: FC<Props> = ({ title, subtitle, className = '' }) => (
  <View className={`mb-4 ${className}`}>  
    <Text className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
      {title}
    </Text>
    {subtitle && (
      <Text className="text-sm text-gray-600 dark:text-gray-400">
        {subtitle}
      </Text>
    )}
  </View>
);

export default SectionHeader;
