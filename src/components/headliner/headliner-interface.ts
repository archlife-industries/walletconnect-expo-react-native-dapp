/*
 * Your component must have a TypeScript interface. Use this file to create it
 * Don't forget to add a brief JSDoc comment above all props.
 * Make sure to include all useful information inside your comment and to use JSDoc tags where necessary (deprecation, throwables, etc.)
 */
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export interface HeadlinerProps {
  text: string
  isBold?: boolean
  /**
   * Style override useful for padding & margin
   * @optional
   */
  style?: ViewStyle
  /**
   * Style override for headliner text
   */
  textStyle?: StyleProp<TextStyle>
}
