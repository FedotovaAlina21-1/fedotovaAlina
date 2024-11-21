import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

export default function Lab2() {
  const [randomCountry, setRandomCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRandomCountry = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomCountry(data[randomIndex].name.common);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Страна:</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <Text style={styles.countryName}>{randomCountry}</Text>
      )}

      <Button title="START" onPress={fetchRandomCountry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countryName: {
    fontSize: 24,
    marginVertical: 20,
  },
});