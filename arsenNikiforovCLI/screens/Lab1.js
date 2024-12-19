import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter } from '../store/store';
import ThemedBackground from '../components/ThemedBackground';
import { ThemedText } from '../components/ThemedText';
import Bubble from '../components/Bubble';
import { ThemeContext } from '../ThemeContext';

const { width, height } = Dimensions.get('window');

const Lab1 = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const { colors } = useContext(ThemeContext);

  const addBubble = useCallback(() => {
    const id = Date.now() + Math.random();
    setBubbles((prevBubbles) => [...prevBubbles, { id }]);
  }, []);

  const removeBubble = useCallback((id) => {
    setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== id));
  }, []);

  const onDrag = useCallback(() => {
    setScore((prevScore) => prevScore + 5);
    dispatch(incrementCounter());
  }, [dispatch]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(addBubble, 2000);
      return () => clearInterval(interval);
    }
  }, [addBubble, gameOver]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameOver(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const resetGame = () => {
    setBubbles([]);
    setScore(0);
    setGameOver(false);
  };

  const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      top: 40,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      zIndex: 1,
      backgroundColor: colors.primaryDark,
    },
    infoButton: {
      padding: 8,
      borderRadius: 5,
      backgroundColor: colors.accentDark,
      alignItems: 'center',
    },
    infoButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    scoreText: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.text,
    },
    counterText: {
      fontSize: 18,
      color: colors.text,
    },
    touchable: {
      flex: 1,
      justifyContent: 'center',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalContainer: {
      width: 320,
      padding: 24,
      borderRadius: 8,
      backgroundColor: colors.secondaryDark,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      color: colors.textLight,
      marginBottom: 20,
      textAlign: 'center',
    },
    closeButton: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      backgroundColor: colors.accentDark,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    gameOverContainer: {
      position: 'absolute',
      top: height / 3,
      left: width / 6,
      right: width / 6,
      backgroundColor: colors.secondaryDark,
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    gameOverText: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
    },
    finalScoreText: {
      fontSize: 18,
      color: colors.textLight,
      marginVertical: 10,
    },
    restartButton: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: colors.accentDark,
    },
    restartButtonText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
  });

  return (
    <ThemedBackground>
      <View style={styles.header}>
        <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.infoButtonText}>Info</Text>
        </TouchableOpacity>
        <ThemedText style={styles.scoreText}>Score: {score}</ThemedText>
        <ThemedText style={styles.counterText}>Counter: {counter}</ThemedText>
      </View>

      <TouchableOpacity style={styles.touchable} onPress={addBubble}>
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            id={bubble.id}
            removeBubble={removeBubble}
            onDrag={onDrag}
            gameOver={gameOver}
          />
        ))}
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>How to Play</Text>
            <Text style={styles.modalText}>Create bubbles and drag them to earn points!</Text>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.finalScoreText}>Your Score: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </ThemedBackground>
  );
};

export default Lab1;