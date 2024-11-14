import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/home.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>CyberLabs 2077</Text>
        <Text style={styles.subtitle}>Лабораторные работы</Text>
        <Text style={styles.studentInfo}>Студент: Никифоров Арсен</Text>
        <Text style={styles.studentInfo}>Группа: ФИИТ-21</Text>
        <Text style={styles.selectText}>Выберите экран:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Lab1')}
        >
          <Text style={styles.buttonText}>Bubble Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Lab2')}
        >
          <Text style={styles.buttonText}>NASA API</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Lab3')}
        >
          <Text style={styles.buttonText}>Space calculator</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0ff',
    marginBottom: 10,
    textShadowColor: '#f0f',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  studentInfo: {
    fontSize: 18,
    color: '#0ff',
    marginBottom: 5,
  },
  selectText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: 'rgba(0, 255, 255, 0.3)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#00ffff',
  },
  buttonText: {
    color: '#00ffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;