import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const OPERATIONS = ['+', '-', '*', '/'];
const MAX_LEVEL = 5;
const MAX_MISTAKES = 3;

const Lab3 = ({ navigation }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [shakeAnimation] = useState(new Animated.Value(0));

  const generateProblem = useCallback((level) => {
    const operation = OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)];
    let num1, num2;
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * (20 * level)) + 1;
        num2 = Math.floor(Math.random() * (20 * level)) + 1;
        break;
      case '-':
        num1 = Math.floor(Math.random() * (20 * level)) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        break;
      case '*':
        num1 = Math.floor(Math.random() * (10 * level)) + 1;
        num2 = Math.floor(Math.random() * (10 * level)) + 1;
        break;
      case '/':
        num2 = Math.floor(Math.random() * (10 * level)) + 1;
        num1 = num2 * (Math.floor(Math.random() * (10 * level)) + 1);
        break;
    }
    return { num1, num2, operation };
  }, []);

  const calculateAnswer = useCallback((problem) => {
    const { num1, num2, operation } = problem;
    switch (operation) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num1 / num2;
    }
  }, []);

  const memoizedProblem = useMemo(() => {
    if (!currentProblem) {
      const newProblem = generateProblem(level);
      setCurrentProblem(newProblem);
      return newProblem;
    }
    return currentProblem;
  }, [level, currentProblem, generateProblem]);

  const memoizedAnswer = useMemo(() => {
    return calculateAnswer(memoizedProblem);
  }, [memoizedProblem, calculateAnswer]);

  const checkAnswer = useCallback(() => {
    const userAnswerNum = parseFloat(userAnswer);
    if (Math.abs(userAnswerNum - memoizedAnswer) < 0.01) {
      ReactNativeHapticFeedback.trigger('notificationSuccess');
      setScore(score + level * 10);
      if (level < MAX_LEVEL) {
        setLevel(level + 1);
      } else {
        setGameOver(true);
      }
      setCurrentProblem(null);
    } else {
      ReactNativeHapticFeedback.trigger('notificationError');
      setMistakes(mistakes + 1);
      if (mistakes + 1 >= MAX_MISTAKES) {
        setGameOver(true);
      }
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    }
    setUserAnswer('');
  }, [userAnswer, memoizedAnswer, level, score, mistakes, shakeAnimation]);

  const restartGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setCurrentProblem(null);
    setUserAnswer('');
    setMistakes(0);
  }, []);

  const renderKeypad = useCallback(() => {
    const keys = [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      ['.', '0', '⌫']
    ];

    return keys.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.keypadRow}>
        {row.map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.keypadButton}
            onPress={() => {
              ReactNativeHapticFeedback.trigger('selection');
              if (key === '⌫') {
                setUserAnswer(userAnswer.slice(0, -1));
              } else if (userAnswer.length < 8) {
                setUserAnswer(userAnswer + key);
              }
            }}
          >
            <Text style={styles.keypadButtonText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  }, [userAnswer]);

  if (gameOver) {
    return (
      <ImageBackground
        source={mistakes >= MAX_MISTAKES ? require('../assets/space_defeat.jpg') : require('../assets/space_victory.jpg')}
        style={styles.container}
      >
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>
            {mistakes >= MAX_MISTAKES ? 'Галактика захвачена!' : 'Галактика спасена!'}
          </Text>
          <Text style={styles.finalScoreText}>Финальный счет: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.restartButtonText}>Начать новую миссию</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/space_battle.jpg')}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.levelText}>Уровень: {level}</Text>
          <Text style={styles.scoreText}>Счет: {score}</Text>
          <Text style={styles.mistakesText}>Ошибки: {mistakes}/{MAX_MISTAKES}</Text>
        </View>
        <View style={styles.problemContainer}>
          <Animated.Text
            style={[
              styles.problemText,
              { transform: [{ translateX: shakeAnimation }] }
            ]}
          >
            {`${memoizedProblem.num1} ${memoizedProblem.operation} ${memoizedProblem.num2} = ?`}
          </Animated.Text>
        </View>
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{userAnswer}</Text>
        </View>
        <View style={styles.keypadContainer}>
          {renderKeypad()}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
          <Text style={styles.submitButtonText}>Уничтожить захватчиков</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  levelText: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  mistakesText: {
    fontSize: 24,
    color: '#FF4500',
    fontWeight: 'bold',
  },
  problemContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  problemText: {
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  answerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    minWidth: 150,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  keypadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  keypadButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 5,
    borderRadius: 10,
  },
  keypadButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  submitButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  finalScoreText: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
  },
  restartButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default Lab3;