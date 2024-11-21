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
  Pressable,
} from "react-native";

export default function MovieSearchScreen() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minYear, setMinYear] = useState("1896");

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
        console.log(data)
        console.log('movies fetched')
      } else {
        setMovies([]);
        console.log('movies not fetched')
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
      return year >= parseInt(minYear);
    });
  }, [movies, minYear]);

  const handleSearch = () => {
    fetchMovies(query);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Movie name"
        value={query}
        onChangeText={setQuery}
        style={styles.searchBar}
      />
      <div style={styles.searchBlock}>
        <Text> Release year</Text>
        <TextInput
          placeholder="Минимальный год"
          value={minYear}
          onChangeText={setMinYear}
          keyboardType="numeric"
          style={styles.searchBar}
        />

        <Pressable style={styles.button} onPress={handleSearch}>
          Search
        </Pressable>
      </div>

      {loading ? (
        <Text>Loading</Text>
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
                <Text>Release year: {item["#YEAR"]}</Text>
                <Text>Actors: {item["#ACTORS"]}</Text>
                <Text>Rank: {item["#RANK"]}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
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
  button: {
    backgroundColor: "green",
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 10
  },
  searchBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,

  }
});