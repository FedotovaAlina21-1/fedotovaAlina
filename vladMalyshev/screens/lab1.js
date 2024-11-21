import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const lab1 = () => {
 
  const [count, setCount] = useState(0);

 
  const increment = () => {
    setCount(count + 1);
  };

 
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Счетчик: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Увеличить" onPress={increment} />
        <Button title="Уменьшить" onPress={decrement} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  counter: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default lab1;