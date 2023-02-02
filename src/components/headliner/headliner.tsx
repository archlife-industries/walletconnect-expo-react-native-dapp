/*
 * Components should not contain internal state or logic! Leave that to containers or screens!
 * You may choose to use the presets file to create new variations of your component.
 * Don't forget to go add all params to your interface file!
 */

import * as React from 'react'
import { View, Text } from 'react-native'
import { fonts, responsiveFontSize } from '../../theme'
import { HeadlinerProps } from './headliner-interface'

/**
 * Describe your new component here...
 */
export const Headliner = (props: HeadlinerProps) => {
  const { style, text, textStyle } = props

  return (
    <View style={{ ...style }}>
      <Text style={{ fontSize: responsiveFontSize(36), color: '#ffffff', fontFamily: fonts.bold, ...textStyle }} >
        {text}
      </Text>
    </View>
  )
}
