import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useAppTheme } from '../../contexts/ThemeContext';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'error' | 'success' | 'white';
  weight?: 'normal' | 'medium' | '600' | 'bold';
  center?: boolean;
  marginBottom?: number;
  marginTop?: number;
  flex?: number;
  children: React.ReactNode;  
}

export const Text = React.forwardRef<RNText, TextProps>(
  (
    {
      variant = 'body',
      color = 'primary',
      weight = 'normal',
      center = false,
      marginBottom,
      marginTop,
      flex,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useAppTheme();

    const fontSizeMap = {
      h1: 32,
      h2: 28,
      h3: 24,
      body: 16,
      bodySmall: 14,
      caption: 12,
    };

    const colorMap = {
      primary: theme.colors.text.primary,
      secondary: theme.colors.text.secondary,
      tertiary: theme.colors.text.tertiary,
      inverse: theme.colors.text.inverse,
      error: '#ef4444',
      success: '#10b981',
      white: '#ffffff',
    };

    const fontWeightMap = {
      normal: '400' as const,
      medium: '500' as const,
      '600': '600' as const,
      bold: '700' as const,
    };

    return (
      <RNText
        ref={ref}
        style={[
          {
            fontSize: fontSizeMap[variant],
            color: colorMap[color],
            fontWeight: fontWeightMap[weight],
            textAlign: center ? 'center' : 'auto',
            includeFontPadding: false,
            textAlignVertical: 'center',
            marginTop,
            marginBottom,
            flex,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </RNText>
    );
  },
);

Text.displayName = 'Text';

export const H1: React.FC<TextProps & { children: React.ReactNode }> = (props) => <Text {...props} variant="h1" />;
export const H2: React.FC<TextProps & { children: React.ReactNode }> = (props) => <Text {...props} variant="h2" />;
export const H3: React.FC<TextProps & { children: React.ReactNode }> = (props) => <Text {...props} variant="h3" />;
export const H4: React.FC<TextProps & { children: React.ReactNode }> = (props) => <Text {...props} variant="h3" />;
export const Body: React.FC<TextProps & { children: React.ReactNode }> = (props) => <Text {...props} variant="body" />;
export const Caption: React.FC<TextProps & { children: React.ReactNode }> = (props) => <Text {...props} variant="caption" />;
export const Label: React.FC<TextProps & { children: React.ReactNode }> = (props) => <Text {...props} variant="body" />;
