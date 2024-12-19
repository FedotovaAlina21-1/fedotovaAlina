import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";

const CurrencyRates = () => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chosenCurrency = ["USD", "EUR", "CNY"];

  const fetchCurrencyRates = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/c8eeda21e63430fa00336497/latest/RUB`
      ); // Получаем курсы относительно рубля
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const filteredRates = Object.fromEntries(
        Object.entries(data.conversion_rates).filter(([currency]) =>
          chosenCurrency.includes(currency)
        )
      ) as { [key: string]: number };
      const convertedRates = Object.fromEntries(
        Object.entries(filteredRates).map(([currency, rate]) => [
          currency,
          parseFloat((1 / rate).toFixed(2)),
        ])
      );
      setRates(convertedRates);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false);
      console.log("Данные обновлены");
    }
  };

  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>КУРСЫ ВАЛЮТ:</Text>
      {Object.entries(rates).map(([currency, rate]) => (
        <Text key={currency} style={styles.rate}>
          1 {currency} = {rate.toFixed(2)} RUB
        </Text>
      ))}
      <Button title="Обновить" onPress={fetchCurrencyRates} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rate: {
    fontSize: 25,
  },
  error: {
    color: "red",
    fontSize: 18,
  },
  updateMessage: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
  },
});

export default CurrencyRates;
