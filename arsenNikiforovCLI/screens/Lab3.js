// Lab3.js
import React, { useState, useMemo, useCallback, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ThemeContext } from '../ThemeContext';

const { width, height } = Dimensions.get('window');

const OPERATIONS = ['+', '-', '*', '/'];
const MAX_LEVEL = 5;
const MAX_MISTAKES = 3;

const Lab3 = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [shakeAnimation] = useState(new Animated.Value(0));
  const { colors } = useContext(ThemeContext);

  const generateProblem = useCallback(level => {
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

  const calculateAnswer = useCallback(problem => {
    const { num1, num2, operation } = problem;
    switch (operation) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
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
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
    setUserAnswer('');
  }, [
    userAnswer,
    memoizedAnswer,
    level,
    score,
    mistakes,
    shakeAnimation,
  ]);

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
      ['.', '0', '⌫'],
    ];

    return keys.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.keypadRow}>
        {row.map(key => (
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
  }, [userAnswer, colors]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width,
      height,
      resizeMode: 'cover',
    },
    gradient: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    levelText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
    },
    scoreText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
    },
    mistakesText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
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
      textAlign: 'center',
      color: colors.text,
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
      color: colors.text,
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
      margin: 5,
      borderRadius: 10,
      borderWidth: 1.5,
      backgroundColor: colors.secondary,
      borderColor: colors.primary,
    },
    keypadButtonText: {
      fontSize: 24,
      color: colors.primary,
    },
    submitButton: {
      padding: 15,
      borderRadius: 10,
      alignSelf: 'center',
      width: '80%',
      alignItems: 'center',
      backgroundColor: colors.accent,
    },
    submitButtonText: {
      fontSize: 24,
      color: colors.text,
    },
    gameOverContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    gameOverText: {
      fontSize: 36,
      marginBottom: 20,
      textAlign: 'center',
      color: colors.text,
    },
    finalScoreText: {
      fontSize: 28,
      marginBottom: 20,
      color: colors.text,
    },
    restartButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: colors.accent,
    },
    restartButtonText: {
      fontSize: 24,
      color: colors.text,
    },
  });

  if (gameOver) {
    return (
      <ImageBackground
        source={
          mistakes >= MAX_MISTAKES
            ? require('../assets/space_defeat.jpg')
            : require('../assets/space_victory.jpg')
        }
        style={styles.container}
      >
        <LinearGradient
          colors={[colors.background, colors.background]}
          style={styles.gradient}
        >
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>
              {mistakes >= MAX_MISTAKES
                ? 'The Galaxy has been conquered!'
                : 'The Galaxy has been saved!'}
            </Text>
            <Text style={styles.finalScoreText}>
              Final Score: {score}
            </Text>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={restartGame}
            >
              <Text style={styles.restartButtonText}>
                Start New Mission
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/space_background.jpg')}
      style={styles.container}
    >
      <LinearGradient
        colors={[colors.background, colors.background]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.levelText}>Level: {level}</Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.mistakesText}>
            Mistakes: {mistakes}/{MAX_MISTAKES}
          </Text>
        </View>
        <View style={styles.problemContainer}>
          <Animated.Text
            style={[
              styles.problemText,
              { transform: [{ translateX: shakeAnimation }] },
            ]}
          >
            {`${memoizedProblem.num1} ${memoizedProblem.operation} ${memoizedProblem.num2} = ?`}
          </Animated.Text>
        </View>
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{userAnswer}</Text>
        </View>
        <View style={styles.keypadContainer}>{renderKeypad()}</View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={checkAnswer}
        >
          <Text style={styles.submitButtonText}>
            Destroy Invaders
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Lab3;