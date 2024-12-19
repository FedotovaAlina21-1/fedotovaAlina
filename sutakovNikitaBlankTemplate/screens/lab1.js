import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import ThemedSafeAreaView from "../components/ThemedSafeAreaView";
import useTheme from "../hooks/useTheme";

const Lab1 = () => {
  const [clicks, setClicks] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [result, setResult] = useState(0);
  const { backgroundColor, textColor } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  if (seconds == 0) {
    if (clicks > result) {
      setResult(clicks);
    }
    setClicks(0);
    setSeconds(5);
  }

  return (
    <ThemedSafeAreaView>
      <Text style={[styles.title, { color: textColor }]}>
        Click per second test
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        Best result: {result} clicks
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        Remaining time: {seconds} seconds
      </Text>
      <TouchableOpacity
        onPress={() => {
          setSeconds(5);
        }}
        style={[styles.button, { backgroundColor: textColor }]}
      >
        <Text style={[styles.text, { color: backgroundColor }]}>
          Restart timer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setClicks(clicks + 1);
        }}
        style={[styles.clickButton, { backgroundColor: textColor }]}
      >
        <Text style={[styles.text, { color: backgroundColor }]}>Click!</Text>
      </TouchableOpacity>
      <Text style={[styles.text, { color: textColor }]}>Clicks: {clicks}</Text>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  text: {
    fontSize: 15,
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  clickButton: {
    padding: 100,
    borderRadius: 120,
    marginTop: 20,
  },
});

export default Lab1;
