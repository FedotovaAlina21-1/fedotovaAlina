import { SafeAreaView, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

const Lab2 = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [textMessage, setTextMessage] = useState("");

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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 30,
        }}
      >
        Погода
      </Text>
      <Text
        style={{
          marginTop: 30,
          fontSize: 20,
        }}
      >
        Введите название вашего города:
      </Text>
      <TextInput
        style={{
          height: 40,
          borderWidth: 1,
          marginTop: 20,
        }}
        value={city}
        onChangeText={setCity}
      />
      <Text
        style={{
          marginTop: 30,
          fontSize: 20,
        }}
      >
        {textMessage}
      </Text>
    </SafeAreaView>
  );
};

export default Lab2;
