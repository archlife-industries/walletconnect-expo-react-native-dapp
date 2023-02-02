import * as React from "react"
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { fonts } from "../../../theme/@stem/fonts";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../theme/@archlife/constants';
import { FadeInImage } from "../fade-in-image/fade-in-image";
import { KeyboardInputAccessory } from "../keyboard-input-accessory/keyboard-input-accessory";
import { TextInputterProps } from "./text-inputter-interface"
import { TextInputterPresets } from "./text-inputter-presets"

/**
 * Describe your new component here...
 */
export const TextInputter = (props: TextInputterProps) => {

  // INCOMING PROPS
  const {
    preset = 'singleLine',
    value,
    placeholder,
    placeholderTextColor,
    onChangeText,
    onPressIcon,
    autoCapitalize,
    autoCorrect,
    label,
    style,
    containerStyle,
    textInputStyle,
    secureTextEntry,
    localFile,
    onFocus,
    onEndEditing,
    autoCompleteType,
    textContentType,
    keyboardType,
  } = props

  const {
    multiline,
    containerHeight,
    minContainerHeight,
    paddingBottomTextInput
  } = TextInputterPresets[preset]

  return (
    <View style={{ ...textInputterStyles.outerContainer, ...style }}>
      {label ?
        <Text style={{ ...textInputterStyles.labelStyle }}>
          {`${label}:`}
        </Text>
        :
        null
      }
      <View style={{ ...textInputterStyles.inputterContainer, borderColor: '#FF69B4', height: containerHeight, minHeight: minContainerHeight, ...containerStyle }}>
        <TextInput
          inputAccessoryViewID={"1"}
          value={value}
          multiline={multiline}
          placeholderTextColor={placeholderTextColor || "#ffffff99"}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardAppearance={"dark"}
          autoCorrect={autoCorrect || false}
          autoCapitalize={autoCapitalize || "sentences"}
          returnKeyType={"done"}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          onEndEditing={onEndEditing}
          autoComplete={autoCompleteType}
          textContentType={textContentType}
          selectionColor={'#FF69B4'}
          keyboardType={keyboardType}
          style={{ ...textInputterStyles.inputter, fontFamily: value ? fonts.bold : fonts.semiBold, paddingBottom: paddingBottomTextInput, ...textInputStyle }}
        />
        {onPressIcon && localFile &&
          <TouchableOpacity onPress={onPressIcon} hitSlop={{ left: 10, top: 5, bottom: 5, right: 10 }}>
            <FadeInImage
              localFile={localFile}
              style={{ height: responsiveWidth(4.8), width: responsiveWidth(4.8) }}
              imageStyle={{ height: responsiveWidth(4.8), width: responsiveWidth(4.8) }}
            />
          </TouchableOpacity>
        }
        <KeyboardInputAccessory inputAccessoryViewID={"1"} />
      </View>
    </View>
  )
}

const textInputterStyles = StyleSheet.create({
  outerContainer: {
    marginTop: responsiveHeight(1.5),
    alignSelf: 'center',
  },
  inputterContainer: {
    color: "#fff",
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(6),
    borderWidth: StyleSheet.hairlineWidth * 2,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputter: {
    flex: 1,
    fontSize: responsiveFontSize(20),
    color: "#ffffff"
  },
  labelStyle: {
    color: '#C1C1C1',
    fontSize: responsiveFontSize(16),
    fontFamily: fonts.semiBold,
    height: responsiveHeight(2.5),
    marginLeft: responsiveWidth(3.5),
    marginBottom: responsiveHeight(0.5)
  }
})