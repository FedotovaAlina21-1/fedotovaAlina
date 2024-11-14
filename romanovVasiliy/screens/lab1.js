import React, { useState, useEffect } from "react";
import { showMessage } from "react-native-flash-message";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
} from "react-native";

const Lab1 = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  useEffect(() => {
    const staticUsers = [
      { id: 1, name: "Ivan Ivanov", email: "ivan@gmail.com" },
      { id: 2, name: "Kirill Kirillin", email: "kirill@gmail.com" },
      { id: 3, name: "Sergey Sergeev", email: "sergey@gmail.com" },
      { id: 4, name: "Petr Petrov", email: "petr@gmail.com" },
    ];

    setUsers(staticUsers);
  }, []);
  useEffect(() => {
    console.log("Лист юзер изменился!");
  }, [users]);
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const addUser = () => {
    if (newUserName && newUserEmail) {
      const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
      const newUser = {
        id: lastUserId + 1,
        name: newUserName,
        email: newUserEmail,
      };
      setUsers([...users, newUser]);
      setNewUserName("");
      setNewUserEmail("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Button title="Удалить" onPress={() => deleteUser(item.id)} />
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Имя пользователя"
          value={newUserName}
          onChangeText={setNewUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email пользователя"
          value={newUserEmail}
          onChangeText={setNewUserEmail}
        />
        <Button title="Добавить пользователя" onPress={addUser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  userContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Lab1;
