/*
* Your component must have a TypeScript interface. Use this file to create it
* Don't forget to add a brief JSDoc comment above all props.
* Make sure to include all useful information inside your comment and to use JSDoc tags where necessary (deprecation, throwables, etc.)
*/
import { StyleProp, ViewStyle } from "react-native";

export interface FadeInImageProps {
  /**
  * @require url to image
  */
  imageUri?: string
  /**
  * @example require("./assets/@archlife/images/back.png")
  */
  localFile?: any
  /**
  * @optional style for the image
  */
  imageStyle?: StyleProp<ViewStyle>
  /**
  * @optional style for the animated.view container that holds the image
  */
  style?: StyleProp<ViewStyle>
  /**
  * @optional time in (ms) miliseconds to fade in the image
  */
  duration?: number | null | undefined
  /**
  * @optional time in (ms) miliseconds to fade in the image
  */
  hasBorderRadius?: boolean
  /**
  *
  */
  onError?: () => void
}
