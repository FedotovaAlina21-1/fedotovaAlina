import React from 'react'
import {Text} from 'react-native'
import {ICustomText} from '../../../interfaces/custom-text.interface'

const MediumText: React.FC<ICustomText> = ({style, children}) => {
  return (
    <Text style={[style, {fontFamily: 'Montserrat-Medium'}]}>{children}</Text>
  )
}

export default MediumText
