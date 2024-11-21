// lab4_2.js
import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useTasksStore } from "../store/zustand";

export default function Lab4_2() {
  const tasks = useTasksStore((state) => state.tasks);
  const toggleTaskStatus = useTasksStore((state) => state.toggleTaskStatus);

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.name}</Text>
      <Text style={styles.statusText}>
        Статус: {item.completed ? "Завершено" : "В процессе"}
      </Text>
      <Button
        title={item.completed ? "Сделать активным" : "Завершить"}
        onPress={() => toggleTaskStatus(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список задач</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTaskItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskContainer: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
  },
  statusText: {
    marginVertical: 10,
    fontSize: 14,
    color: "gray",
  },
});
