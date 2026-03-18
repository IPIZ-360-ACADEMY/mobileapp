import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { useAppTheme } from '@contexts/ThemeContext';

interface BoxProps extends ViewProps {
  children?: ReactNode;
  padding?: number;
  paddingH?: number;
  paddingV?: number;
  margin?: number;
  marginH?: number;
  marginV?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  bg?: 'primary' | 'secondary' | 'tertiary';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  flex?: number;
  flexDirection?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  gap?: number;
}

/**
 * Box Component - Container base minimalista
 */
export const Box = React.forwardRef<View, BoxProps>(
  (
    {
      children,
      padding,
      paddingH,
      paddingV,
      margin,
      marginH,
      marginV,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      bg = 'primary',
      rounded = 'md',
      flex,
      flexDirection = 'column',
      flexWrap,
      justifyContent = 'flex-start',
      alignItems = 'stretch',
      gap = 0,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useAppTheme();

    const borderRadiusMap = {
      none: 0,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      full: 999,
    };

    const bgColor = bg === 'primary' ? theme.colors.background.primary : 
                   bg === 'secondary' ? theme.colors.background.secondary : 
                   theme.colors.background.tertiary;

    return (
      <View
        ref={ref}
        style={[
          {
            paddingHorizontal: paddingH ?? padding ?? 0,
            paddingVertical: paddingV ?? padding ?? 0,
            marginHorizontal: marginH ?? margin ?? marginLeft ?? marginRight ?? 0,
            marginVertical: marginV ?? margin ?? marginTop ?? marginBottom ?? 0,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            backgroundColor: bgColor,
            borderRadius: borderRadiusMap[rounded],
            flex: flex,
            flexDirection,            flexWrap,            justifyContent,
            alignItems,
            gap,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  },
);

Box.displayName = 'Box';
