import { Text, TextInput, FlatList, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ThemedSafeAreaView from "../components/ThemedSafeAreaView";
import useTheme from "../hooks/useTheme";

const Lab3 = () => {
  const [items, setItems] = useState([]);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("Infinity");
  const [sortOrder, setSortOrder] = useState("asc");
  const { backgroundColor, textColor } = useTheme();

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

  return (
    <ThemedSafeAreaView>
      <Text style={[styles.title, { color: textColor }]}>Список товаров</Text>
      <TextInput
        placeholder="Минимальная цена"
        value={minPrice}
        onChangeText={setMinPrice}
        keyboardType="numeric"
        style={[styles.input, { color: textColor, borderColor: textColor }]}
      />
      <TextInput
        placeholder="Максимальная цена"
        value={maxPrice}
        onChangeText={setMaxPrice}
        keyboardType="numeric"
        style={[styles.input, { color: textColor, borderColor: textColor }]}
      />
      <Text style={{ color: textColor }}>Сортировка по цене:</Text>
      <Picker
        selectedValue={sortOrder}
        onValueChange={(sortValue) => setSortOrder(sortValue)}
        style={[styles.picker, { color: textColor }]}
      >
        <Picker.Item label="По возрастанию" value="asc" />
        <Picker.Item label="По убыванию" value="desc" />
      </Picker>
      <FlatList
        data={getFilteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={[styles.item, { backgroundColor: backgroundColor }]}>
              <Text
                style={[
                  styles.itemText,
                  { color: textColor, fontWeight: "bold" },
                ]}
              >
                {item.title}
              </Text>
              <Text style={[styles.itemText, { color: textColor }]}>
                Цена: ${item.price}
              </Text>
              <Text style={[styles.itemText, { color: textColor }]}>
                Rating: ${item.rating?.rate}
              </Text>
            </View>
          );
        }}
      />
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  picker: {
    height: 40,
    width: 150,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
  },
});

export default Lab3;
