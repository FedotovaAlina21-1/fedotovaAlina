import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Lab1() {
  const [message, setMessage] = useState('Нажмите кнопку');
  const [bgColor, setBgColor] = useState('#fff');

  const changeBackgroundColor = () => {
    setMessage('Нажми на кнопку!');
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text>{message}</Text>
      <Button title="START" onPress={changeBackgroundColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});