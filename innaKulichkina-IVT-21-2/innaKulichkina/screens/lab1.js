import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Animated } from 'react-native';

export default function ColorAndMoveScreen() {
  const [color, setColor] = useState('blue');
  const [position, setPosition] = useState(new Animated.Value(0));

  const handlePress = () => {
    const newColor = color === 'blue' ? 'green' : 'blue';
    setColor(newColor);

    Animated.timing(position, {
      toValue: position._value === 0 ? 100 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.rectangle,
          { backgroundColor: color, transform: [{ translateY: position }] },
        ]}
      />
      <Button title="Change Color and Move" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});
