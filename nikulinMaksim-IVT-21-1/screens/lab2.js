import React, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

const Lab2 = () => {
  const [fact, setFact] = useState('');

  const getRandomFact = async () => {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      setFact(data.text);
    } 
    catch (error) {
      console.error(error);
      setFact("Error getting fact");
    }
  };

  useEffect(() => {
    getRandomFact();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.factText}>{fact}</Text>
      <Button title="Get useless fact!" onPress={getRandomFact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  factText: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default Lab2