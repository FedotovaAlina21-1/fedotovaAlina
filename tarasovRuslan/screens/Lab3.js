import React, { useState, useMemo } from 'react';
import { Button, SafeAreaView, View, Text, FlatList } from 'react-native';

const Lab3 = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [items, setItems] = useState([
        'Яблоко',
        'Банан',
        'Апельсин',
        'Персик',
        'Ананас',
        'Клубника',
    ]);

    const sortedItems = useMemo(() => {
        console.log('Сортируем список...');
        return [...items].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        });
    }, [sortOrder, items]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View>
                <Text>Сортировка:</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Button title="По возрастанию" onPress={() => setSortOrder('asc')} />
                    <Button title="По убыванию" onPress={() => setSortOrder('desc')} />
                </View>
                <FlatList
                    data={sortedItems}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => <Text>{item}</Text>}
                />
            </View>
        </SafeAreaView>
    );
};

export default Lab3;
