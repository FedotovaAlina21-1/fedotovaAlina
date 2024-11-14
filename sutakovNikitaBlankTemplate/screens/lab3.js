import {
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  View,
  Button,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Lab3 = () => {
  const [items, setItems] = useState([]);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("Infinity");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const getFakeStoreData = () => {
    const url = "https://fakestoreapi.com/products";
    axios.get(url).then((storeData) => {
      setItems(storeData.data);
    });
  };

  useEffect(() => {
    getFakeStoreData();
  }, []);

  const getFilteredItems = useMemo(() => {
    const filteredItems = items
      .filter((item) => {
        return (
          item.price >= parseFloat(minPrice) &&
          item.price <= parseFloat(maxPrice)
        );
      })
      .sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    return filteredItems;
  }, [items, minPrice, maxPrice, sortOrder]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const containerStyle = isDarkTheme
    ? styles.darkContainer
    : styles.lightContainer;
  const textStyle = isDarkTheme ? styles.darkText : styles.lightText;

  return (
    <SafeAreaView style={containerStyle}>
      <Text style={textStyle}>Список товаров</Text>
      <Button title="Переключить тему" onPress={toggleTheme} />
      <TextInput
        placeholder="Минимальная цена"
        value={minPrice}
        onChangeText={setMinPrice}
        keyboardType="numeric"
        style={[textStyle, { height: 40, borderWidth: 1 }]}
      />
      <TextInput
        placeholder="Максимальная цена"
        value={maxPrice}
        onChangeText={setMaxPrice}
        keyboardType="numeric"
        style={[textStyle, { height: 40, borderWidth: 1 }]}
      />
      <Text style={textStyle}>Сортировка по цене:</Text>
      <Picker
        style={[textStyle, { height: 40, width: 150 }]}
        selectedValue={sortOrder}
        onValueChange={(sortValue) => setSortOrder(sortValue)}
      >
        <Picker.Item label="По возрастанию" value="asc" />
        <Picker.Item label="По убыванию" value="desc" />
      </Picker>
      <FlatList
        data={getFilteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={containerStyle}>
              <Text style={[textStyle, { fontWeight: "bold" }]}>
                {item.title}
              </Text>
              <Text style={textStyle}>Цена: ${item.price}</Text>
              <Text style={textStyle}>Rating: ${item.rating?.rate}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  darkContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
  },
  lightText: {
    color: "#000000",
    marginTop: 15,
    fontSize: 15,
  },
  darkText: {
    color: "#ffffff",
    marginTop: 15,
    fontSize: 15,
  },
});

export default Lab3;
