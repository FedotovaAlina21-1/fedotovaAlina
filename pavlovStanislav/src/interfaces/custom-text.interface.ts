import {ReactNode} from 'react'
import {StyleProp, TextStyle} from 'react-native'

export interface ICustomText {
  style?: StyleProp<TextStyle>
  children: ReactNode
}
