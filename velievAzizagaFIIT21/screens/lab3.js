import React, { useState, useMemo } from 'react';
import { View, Button ,Text, TextInput, FlatList, StyleSheet, SafeAreaView , ThemeProvider, textColor} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { increment, reset, double } from "../redux/counterSlice";

export default function Lab3() {
  const count =useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [textColor, setTextColor] = useState('black');

  const users = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Edward',
    'Frank',
    'George',
    'Hannah',
  ];

  // useMemo мемоизирует отфильтрованный список, чтобы пересчитывать его только при изменении searchTerm или списка пользователей
  const filteredUsers = useMemo(() => {
    console.log('Фильтрация пользователей...');
    return users.filter(user => user.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, users]);

  const changeTextColor = () => {
    setTextColor(prevColor => (prevColor === 'black' ? 'blue' : 'black'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Поиск пользователей"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={[styles.user,{color: textColor}]}>{item}</Text>}
      />
      <Button title="Изменить цвет текста" onPress={changeTextColor} />
      <Text style={styles.text}>Счётчик: {count}</Text>
      <Button title="Увеличить" onPress={() => dispatch(increment())} />
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  user: {
    fontSize: 18,
    paddingVertical: 5,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  
});
