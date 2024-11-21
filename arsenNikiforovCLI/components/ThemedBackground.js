// ThemedBackground.js
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext';

const ThemedBackground = ({ children }) => {
  const { colors } = useContext(ThemeContext);

  return <View style={[styles.container, { backgroundColor: colors.background }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemedBackground;