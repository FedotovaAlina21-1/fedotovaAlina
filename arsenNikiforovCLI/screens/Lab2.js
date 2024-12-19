// Lab2.js
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
  createContext,
  useContext,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Text,
  Dimensions,
} from 'react-native';
import WebView from 'react-native-webview';
import { ThemeContext } from '../ThemeContext';

const { width, height } = Dimensions.get('window');

const GlobalStateContext = createContext();

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { data: action.payload, loading: false, error: null };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error();
  }
};

const useAPOD = date => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const result = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message });
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
};

const VideoPlayer = ({ url }) => {
  const getYoutubeVideoId = url => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(url);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : url;

  return (
    <View style={styles.videoWrapper}>
      <WebView
        source={{ uri: embedUrl }}
        style={styles.video}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
};

const Lab2 = ({ navigation }) => {
  const [date, setDate] = useState(() => {
    return new Date().toISOString().slice(0, 10);
  });

  const { data, loading, error } = useAPOD(date);
  const { globalData, setGlobalData } = useContext(GlobalStateContext);
  const { colors } = useContext(ThemeContext);

  const loadRandomAPOD = useCallback(() => {
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
    )
      .toISOString()
      .slice(0, 10);
    setDate(randomDate);
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  const updateGlobalData = useCallback(() => {
    if (memoizedData) {
      setGlobalData(memoizedData);
      Alert.alert('Успешно', 'Изображение сохранено в избранное!');
    }
  }, [memoizedData, setGlobalData]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width,
      height,
      resizeMode: 'cover',
      backgroundColor: colors.background,
    },
    header: {
      marginTop: 40,
      alignItems: 'flex-end',
      marginRight: 20,
    },
    button: {
      padding: 15,
      borderRadius: 8,
      borderWidth: 1.5,
      backgroundColor: colors.accent,
    },
    buttonText: {
      fontSize: 16,
      color: colors.text,
    },
    content: {
      alignItems: 'center',
      padding: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 18,
      color: colors.text,
    },
    errorContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    errorText: {
      fontSize: 18,
      color: 'red',
    },
    retryButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 8,
      backgroundColor: colors.accent,
    },
    retryButtonText: {
      fontSize: 16,
      color: colors.text,
    },
    dataContainer: {
      alignItems: 'center',
    },
    titleText: {
      fontSize: 22,
      marginBottom: 10,
      fontWeight: 'bold',
      color: colors.text,
    },
    image: {
      width: width - 40,
      height: 300,
      borderRadius: 10,
    },
    videoWrapper: {
      width: width - 40,
      height: 300,
      borderRadius: 10,
      overflow: 'hidden',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    dateText: {
      fontSize: 16,
      marginVertical: 10,
      color: colors.text,
    },
    explanationText: {
      fontSize: 14,
      textAlign: 'center',
      marginTop: 10,
      color: colors.text,
    },
    globalButton: {
      padding: 12,
      borderRadius: 8,
      marginTop: 15,
      backgroundColor: colors.accent,
    },
    globalButtonText: {
      fontSize: 16,
      color: colors.text,
    },
    savedDataContainer: {
      marginTop: 30,
      padding: 20,
      borderRadius: 10,
      backgroundColor: colors.secondary,
    },
    savedDataTitle: {
      fontSize: 18,
      color: colors.text,
    },
    savedDataText: {
      fontSize: 14,
      color: colors.text,
    },
    viewSavedButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 8,
      backgroundColor: colors.accent,
    },
    viewSavedButtonText: {
      fontSize: 16,
      color: colors.text,
    },
    videoContainer: {
      width: width - 40,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoText: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={loadRandomAPOD}
        >
          <Text style={styles.buttonText}>
            Загрузить другое изображение
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.accent} />
            <Text style={styles.loadingText}>Загрузка данных...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Ошибка: {error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={loadRandomAPOD}
            >
              <Text style={styles.retryButtonText}>Повторить</Text>
            </TouchableOpacity>
          </View>
        ) : memoizedData ? (
          <View style={styles.dataContainer}>
            <Text style={styles.titleText}>
              {memoizedData.title || 'Название недоступно'}
            </Text>
            {memoizedData.media_type === 'image' ? (
              <Image
                source={{ uri: memoizedData.url }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : memoizedData.media_type === 'video' ? (
              <VideoPlayer url={memoizedData.url} />
            ) : (
              <View style={styles.videoContainer}>
                <Text style={styles.videoText}>
                  Формат медиа не поддерживается
                </Text>
              </View>
            )}
            <Text style={styles.dateText}>
              Дата: {memoizedData.date}
            </Text>
            <Text style={styles.explanationText}>
              {memoizedData.explanation}
            </Text>

            <TouchableOpacity
              style={styles.globalButton}
              onPress={updateGlobalData}
            >
              <Text style={styles.globalButtonText}>
                Сохранить в избранное
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.errorText}>
            Данные не загружены
          </Text>
        )}

        {globalData && (
          <View style={styles.savedDataContainer}>
            <Text style={styles.savedDataTitle}>
              Сохраненное изображение:
            </Text>
            <Text style={styles.savedDataText}>
              {globalData.title}
            </Text>
            <Text style={styles.savedDataText}>
              Дата: {globalData.date}
            </Text>
            <TouchableOpacity
              style={styles.viewSavedButton}
              onPress={() =>
                navigation.navigate('SavedImage', { data: globalData })
              }
            >
              <Text style={styles.viewSavedButtonText}>
                Просмотреть
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const GlobalStateProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState(null);

  return (
    <GlobalStateContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const Lab2WithProvider = props => (
  <GlobalStateProvider>
    <Lab2 {...props} />
  </GlobalStateProvider>
);

export default Lab2WithProvider;