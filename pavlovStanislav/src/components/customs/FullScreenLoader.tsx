import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {colors} from '../../constants/colors.const'

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
})

const FullScreenLoader: React.FC = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator />
    </View>
  )
}

export default FullScreenLoader
