import React, { useState, useMemo } from "react";
import { StyleSheet, Text, TextInput, View, FlatList } from "react-native";

export default function Lab3() {
  const [searchTerm, setSearchTerm] = useState("");

  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Edward",
    "Frank",
    "Grace",
    "Hannah",
  ];

  const filteredNames = useMemo(() => {
    console.log("Фильтруем список...");
    return names.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Фильтрация списка имен</Text>
      <TextInput
        style={styles.input}
        placeholder="Искать имя..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
        data={filteredNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.name}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
});