import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const SavedImage = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      {data.media_type === 'image' ? (
        <Image source={{ uri: data.url }} style={styles.image} resizeMode="contain" />
      ) : (
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>Видео не поддерживается в этом компоненте</Text>
        </View>
      )}
      <Text style={styles.dateText}>Дата: {data.date}</Text>
      <Text style={styles.explanationText}>{data.explanation}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Назад</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#0f0c29',
  },
  title: {
    fontSize: 28,
    color: '#FF00FF',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#FF00FF80',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  videoPlaceholder: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 10,
  },
  videoText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'justify',
    lineHeight: 24,
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#00FFFF',
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default SavedImage;