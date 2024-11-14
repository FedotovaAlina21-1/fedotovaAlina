import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function Lab2() {
  const [randomFact, setRandomFact] = useState();
  const [isLoading, setLoading] = useState(false);
  const [todayFact, setTodayFact] = useState();

  const getRandomFact = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
      const data = await response.json();
      setRandomFact(data.text);
    }
    catch(e) {
      setRandomFact(`Произошла ошибка: ${e.message}`);
    }
    setLoading(false);
  }
  const getTodayFact = async () => {
    try {
      const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/today");
      const data = await response.json();
      setTodayFact(`Сегодняшний факт: ${data.text}`);
    }
    catch(e) {
      setTodayFact(`Произошла ошибка: ${e.message}`);
    }
  }
  useEffect(() => {
    getRandomFact();
    getTodayFact();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{randomFact}</Text>
      <Button title="Случайный бесполезный факт" disabled={isLoading} onPress={getRandomFact} />
      <Text style={styles.text}>{todayFact}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 10,
    marginTop: 50,
    textAlign: 'center'
  }
});
