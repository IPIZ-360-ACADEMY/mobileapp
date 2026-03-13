/**
 * IPIZ Mobile App - Professional Screen Container
 * Reusable container with gradient background for screens
 */

import React from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfessionalScreenProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: string;
  gradientColors?: string[];
  className?: string;
  contentContainerClassName?: string;
  showGradient?: boolean;
}

/**
 * Professional Screen Component
 * Provides gradient background and consistent spacing
 * @example
 * <ProfessionalScreen>
 *   <Text>Your content here</Text>
 * </ProfessionalScreen>
 */
export const ProfessionalScreen: React.FC<ProfessionalScreenProps> = ({
  children,
  scrollable = true,
  padding = 'p-6',
  gradientColors = ['#F8FAFC', '#F1F5F9'],
  className = '',
  contentContainerClassName = '',
  showGradient = true,
  ...props
}) => {
  const content = (
    <View className={`flex-1 ${padding} ${className}`} {...props}>
      {children}
    </View>
  );

  if (showGradient) {
    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        {scrollable ? (
          <ScrollView
            contentContainerClassName={`flex-grow ${contentContainerClassName}`}
            showsVerticalScrollIndicator={false}
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </LinearGradient>
    );
  }

  if (scrollable) {
    return (
      <ScrollView
        className="bg-slate-50"
        contentContainerClassName={`flex-grow ${contentContainerClassName}`}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    );
  }

  return <View className="flex-1 bg-slate-50">{content}</View>;
};

export default ProfessionalScreen;
