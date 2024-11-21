
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '../ThemeContext';

export const ThemedText = ({ style, ...props }) => {
  const { colors } = useContext(ThemeContext);

  return <Text style={[{ color: colors.text }, style]} {...props} />;
};
