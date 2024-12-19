import React, { useState, useMemo } from "react";
import { View, Text, FlatList, Button } from "react-native";

const DATA = Array.from({ length: 21 }, (_, i) => ({
  id: i,
  name: `Компонент ${i}`,
}));

const Item = ({ name }: { name: string }) => {
  return <Text>{name}</Text>;
};

const MemoizedItem = React.memo(Item);

const App = () => {
  const [count, setCount] = useState(0);

  const memoizedData = useMemo(() => {
    return DATA.map((item) => ({ ...item, name: `${item.name} ${count}` }));
  }, [count]);

  return (
    <View>
      <Text>СЧЕТ: {count}</Text>
      <Button title="Увеличить" onPress={() => setCount(count + 1)} />
      <FlatList
        data={memoizedData}
        renderItem={({ item }) => <MemoizedItem name={item.name} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default App;
