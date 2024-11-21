import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

const CatFactApp = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCatFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      console.error('Error fetching the cat fact:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cat Fact</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.factText}>{fact}</Text>
      )}
      <Button title="Get Another Fact" onPress={fetchCatFact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  factText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CatFactApp;
