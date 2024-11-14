import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const SavedImage = ({ route }) => {
  const { data } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Image source={{ uri: data.url }} style={styles.image} />
      <Text style={styles.dateText}>Дата: {data.date}</Text>
      <Text style={styles.explanationText}>{data.explanation}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  dateText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10,
  },
  explanationText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'justify',
  },
});

export default SavedImage;