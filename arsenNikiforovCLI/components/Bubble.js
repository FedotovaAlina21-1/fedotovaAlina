
// Bubble.js
import React, { useEffect, useState, useContext } from 'react';
import { Animated, StyleSheet, Dimensions, PanResponder } from 'react-native';
import { ThemeContext } from '../ThemeContext';

const { width, height } = Dimensions.get('window');

const Bubble = ({ id, removeBubble, onDrag, gameOver }) => {
  const [position] = useState(
    new Animated.ValueXY({ x: Math.random() * (width - 80), y: height })
  );
  const [opacity] = useState(new Animated.Value(1));
  const { colors } = useContext(ThemeContext);

  const color = colors.accent;

  useEffect(() => {
    if (!gameOver) {
      Animated.timing(position, {
        toValue: { x: position.x._value, y: -100 },
        duration: 5000,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          removeBubble(id);
        }
      });
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [gameOver, id, position, removeBubble, opacity]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        removeBubble(id);
        onDrag();
      });
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.bubble,
        {
          backgroundColor: color,
          transform: position.getTranslateTransform(),
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default Bubble;
