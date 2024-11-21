import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

export default function lab2() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counterContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text style={styles.text}>{joke}</Text>
        )}
        <Button title="Получить шутку" onPress={fetchJoke} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counterContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
});
