import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Lab1 = () => {
  const [text, setText] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  const handleTextInputChange = (newText) => {
    setText(newText);
  };

  const handleButtonPress = () => {
    setDisplayedText(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите текст:</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleTextInputChange}
        placeholder="Введите текст"
      />
      <Button title="Отобразить текст" onPress={handleButtonPress} />
      {displayedText && <Text style={styles.displayedText}>{displayedText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  displayedText: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default Lab1;