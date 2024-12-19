import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import { useTasksStore } from "../store/zustand";

export default function Lab4_1() {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const tasks = useTasksStore((state) => state.tasks);
  const addTask = useTasksStore((state) => state.addTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const editTask = useTasksStore((state) => state.editTask);

  const handleAddTask = () => {
    if (title) {
      addTask(title);
      setTitle("");
    }
  };

  const handleEditTask = () => {
    if (newTitle && editId !== null) {
      editTask(editId, newTitle);
      setEditId(null);
      setNewTitle("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите название задачи"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Добавить задачу" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>{item.name}</Text>
              <Text style={styles.taskStatus}>
                Статус: {item.completed ? "Завершено" : "В процессе"}
              </Text>
            </View>
            <Button title="Удалить" onPress={() => deleteTask(item.id)} />
            <Button
              title="Редактировать"
              onPress={() => {
                setEditId(item.id);
                setNewTitle(item.name);
              }}
            />
          </View>
        )}
      />

      {editId && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Новое название задачи"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <Button title="Сохранить изменения" onPress={handleEditTask} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskTitle: { fontSize: 16, fontWeight: "bold" },
  taskStatus: { fontSize: 14, color: "gray" },
  editContainer: { marginTop: 20 },
});
