import React from 'react'
import {Text} from 'react-native'
import {ICustomText} from '../../../interfaces/custom-text.interface'

const RegularText: React.FC<ICustomText> = ({style, children}) => {
  return (
    <Text style={[style, {fontFamily: 'Montserrat-Regular'}]}>{children}</Text>
  )
}

export default RegularText
