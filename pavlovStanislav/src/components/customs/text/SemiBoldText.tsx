import React from 'react'
import {Text} from 'react-native'
import {ICustomText} from '../../../interfaces/custom-text.interface'

const SemiBoldText: React.FC<ICustomText> = ({style, children}) => {
  return (
    <Text style={[style, {fontFamily: 'Montserrat-SemiBold'}]}>{children}</Text>
  )
}

export default SemiBoldText
