import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

const Lab3 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=100");
        if (!response.ok) {
          throw new Error("Проблемы с сетью");
        }
        const data = await response.json();
        const usersWithId = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          picture: user.picture.large,
          age: user.dob.age,
          city: user.location.city,
        }));
        setUsers(usersWithId);
      } catch (error) {
        console.error("Ошибка при загрузке", error);
      } finally {
        setLoading(false);
      }
    };

    const addUser = () => {
        if (newUserName && newUserEmail) {
          const lastUserId = users.length > 0 ? users[users.length - 1].id : "0";
          const newUser = {
            id: `${parseInt(lastUserId.split("-")[0]) + 1}-custom`,
            name: newUserName,
            email: newUserEmail,
            age: Math.floor(Math.random() * (60 - 18 + 1)) + 18,
            city: "Новый Город",
          };
          setUsers([...users, newUser]);
          setNewUserName("");
          setNewUserEmail("");
        }
      };


         fetchUsers();
         }, []);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  if (loading) {
    return <Text style={styles.loadingText}>Загрузка...</Text>;
  }

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Поиск сотрудника"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image source={{ uri: item.picture }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>Возраст: {item.age}</Text>
              <Text>Город: {item.city}</Text>
            </View>
            <Button
              title="Удалить"
              onPress={() => deleteUser(item.id)}
              color="#ff4d4d"
            />
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Имя сотрудника"
          value={newUserName}
          onChangeText={setNewUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email сотрудника"
          value={newUserEmail}
          onChangeText={setNewUserEmail}
        />
        <Button
          title="Добавить сотрудника"
          onPress={addUser}
          color="#4CAF50"
        />
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
  darkContainer: {
    backgroundColor: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  themeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  themeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
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

export default Lab3;