import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, Image, View } from 'react-native';
import axios from 'axios';

const httpStatusCodes = ['100', '200', '201', '202', '204', '301', '302', '400', '401', '403', '404', '418', '500', '502', '503'];

const Lab2 = () => {
  const [imageUrl, setImageUrl] = useState('');

  const getData = () => {
    const status_code = httpStatusCodes[Math.floor(Math.random() * httpStatusCodes.length)];
    setImageUrl(`https://http.cat/${status_code}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          margin: 20,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
        ) : null}
        <Button
          title="Случайная страница с КОТшибкой"
          onPress={() => {
            getData();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Lab2;
