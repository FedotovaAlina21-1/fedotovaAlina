import { Text, TextInput, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import ThemedSafeAreaView from "../components/ThemedSafeAreaView";
import useTheme from "../hooks/useTheme";

const Lab2 = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [textMessage, setTextMessage] = useState("");
  const { backgroundColor, textColor } = useTheme();

  const getWeatherData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=fb55c434b593d7e53d17f9a7911897f4`;
    axios
      .get(url)
      .then((dataWeather) => {
        if (dataWeather.data.name.length > 0) {
          setWeatherData(dataWeather);
        } else {
          setTextMessage("Город не найден");
        }
      })
      .catch((err) => {
        setTextMessage("Ошибка при получении данных");
      });
  };

  useEffect(() => {
    if (city.length > 0) {
      getWeatherData();
    }
  }, [city]);

  useEffect(() => {
    if (Object.keys(weatherData).length > 0) {
      setTextMessage(
        `Погода в: ${weatherData.data.name}\nТемпература воздуха: ${weatherData.data.main.temp}\nОщущается как: ${weatherData.data.main.feels_like}\nПогода: ${weatherData.data.weather[0].main}\nОписание: ${weatherData.data.weather[0].description}\nСкорость ветра: ${weatherData.data.wind.speed}\nВлажность воздуха: ${weatherData.data.main.humidity}`
      );
    }
  }, [weatherData]);

  return (
    <ThemedSafeAreaView>
      <Text style={[styles.title, { color: textColor }]}>Погода</Text>
      <Text style={[styles.text, { color: textColor }]}>
        Введите название вашего города:
      </Text>
      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        value={city}
        onChangeText={setCity}
      />
      <Text style={[styles.message, { color: textColor }]}>{textMessage}</Text>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  text: {
    fontSize: 20,
    marginTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginTop: 20,
    width: "80%",
  },
  message: {
    marginTop: 30,
    fontSize: 18,
    textAlign: "center",
  },
});

export default Lab2;
