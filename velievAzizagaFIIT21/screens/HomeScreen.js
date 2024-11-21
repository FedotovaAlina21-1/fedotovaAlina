import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Перейти к Заданию 1"
        onPress={() => navigation.navigate('lab1')}
        style={styles.button}
      />
      <Button
        title="Перейти к Заданию 2"
        onPress={() => navigation.navigate('lab2')}
        style={styles.button}
      />
      <Button
        title="Перейти к Заданию 3"
        onPress={() => navigation.navigate('lab3')}
        style={styles.button}
      />
      <Button
        title="Перейти к Заданию 4"
        onPress={() => navigation.navigate('lab4')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    width: '80%',
  },
  spacing: {
    height: 10,
  },
});
