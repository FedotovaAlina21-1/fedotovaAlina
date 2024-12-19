import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

const Lab1 = () => {
  const [clicks, setClicks] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [result, setResult] = useState(0);

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 30,
        }}
      >
        Click per second test
      </Text>
      <Text
        style={{
          color: "white",
          marginTop: 30,
          fontSize: 20,
        }}
      >
        Best result: {result} clicks
      </Text>
      <Text
        style={{
          color: "white",
          marginTop: 30,
          fontSize: 20,
        }}
      >
        Remaining time: {seconds} seconds
      </Text>
      <TouchableOpacity
        onPress={() => {
          setSeconds(5);
        }}
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: "black",
          }}
        >
          Restart timer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setClicks(clicks + 1);
        }}
        style={{
          backgroundColor: "white",
          padding: 100,
          borderRadius: 120,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: "black",
          }}
        >
          Click!
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          marginTop: 30,
          fontSize: 20,
        }}
      >
        Clicks: {clicks}
      </Text>
    </SafeAreaView>
  );
};

export default Lab1;
