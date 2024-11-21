import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

export default function MovieSearchScreen() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minYear, setMinYear] = useState("1800");
  const [maxYear, setMaxYear] = useState("3000");

  const fetchMovies = async (searchQuery) => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data.ok && data.description) {
        setMovies(data.description);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Ошибка при получении данных о фильмах:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  //позволяет избежать повторной фильтрации списка фильмов каждый раз, когда происходит ререндер компонента (например, из-за ввода текста или изменения состояния), если сами фильмы или диапазон годов не менялись.
  const getFilteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const year = parseInt(movie["#YEAR"]);
      return year >= parseInt(minYear) && year <= parseInt(maxYear);
    });
  }, [movies, minYear, maxYear]);

  const handleSearch = () => {
    fetchMovies(query);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Введите название фильма"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <TextInput
        placeholder="Минимальный год"
        value={minYear}
        onChangeText={setMinYear}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Максимальный год"
        value={maxYear}
        onChangeText={setMaxYear}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Поиск" onPress={handleSearch} />

      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <FlatList
          data={getFilteredMovies}
          keyExtractor={(item) => item["#IMDB_ID"]}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image
                source={{ uri: item["#IMG_POSTER"] }}
                style={styles.poster}
                resizeMode="cover"
              />
              <View style={styles.movieDetails}>
                <Text style={styles.title}>{item["#TITLE"]}</Text>
                <Text>Год: {item["#YEAR"]}</Text>
                <Text>Актеры: {item["#ACTORS"]}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  movieItem: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
