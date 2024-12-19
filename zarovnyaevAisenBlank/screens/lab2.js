import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, ScrollView } from "react-native";

const countries = [
  { code: "AT", name: "Австрия" },
  { code: "US", name: "США" },
  { code: "CA", name: "Канада" },
  { code: "FR", name: "Франция" },
  { code: "GB", name: "Великобритания" },
  { code: "JP", name: "Япония" },
  { code: "RU", name: "Россия" },
];

export default function AdministrativeDivisionsScreen() {
  const [divisions, setDivisions] = useState([]);
  const [countryIndex, setCountryIndex] = useState(0);

  const fetchDivisions = async (countryCode) => {
    try {
      const response = await fetch(
        `https://rawcdn.githack.com/kamikazechaser/administrative-divisions-db/master/api/${countryCode}.json`
      );
      const data = await response.json();
      console.log("Fetched Data:", data);
      setDivisions(data); // Устанавливаем данные административных единиц
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
  };

  useEffect(() => {
    fetchDivisions(countries[countryIndex].code); // Загружаем данные для текущей страны
  }, [countryIndex]);

  const handleChangeCountry = () => {
    setCountryIndex((prevIndex) => (prevIndex + 1) % countries.length); // Изменяем индекс страны
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            margin: 20,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            Административные единицы в {countries[countryIndex].name}:
          </Text>
          {divisions.map((division, index) => (
            <Text key={index}>{division}</Text> // Отображаем каждую административную единицу
          ))}
        </View>
      </ScrollView>
      <Button
        title={"Сменить страну"}
        onPress={handleChangeCountry} // Меняем страну при нажатии кнопки
        style={{ margin: 20 }}
      />
    </SafeAreaView>
  );
}
