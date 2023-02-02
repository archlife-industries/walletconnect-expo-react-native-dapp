/*
* Generally, components should not contain internal state/logic!
* Generally, we want all state/logic variables to be in the screen-functions.ts files so we have access to them all in one place.
* This is because we want to be able to easily change the state/logic of the screen in one place.
* It is okay to include internal state/logic if multiple instances of the component are needed on a single screen.
* Also worth mentioning: you may choose to use the presets file to create new variations of this component.
* Don't forget to add all props in the interface file!
*/

import * as React from "react"
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native"
import { responsiveWidth, responsiveFontSize } from "../../../theme/@archlife/constants"
import { FadeInView } from "../.."
import { CircleXProps } from "./circle-x-interface"

/**
 * Describe the new component here...
 */
export const CircleX = (props: CircleXProps) => {

  // INCOMING PROPS
  const {
    style,
    onPress,
    onPressLeftArrow,
    onPressRightArrow,
    customText,
    duration,
  } = props

  return (
    <FadeInView duration={duration === null ? undefined : 400} style={{ bottom: Platform.OS === 'ios' ? responsiveWidth(7) : responsiveWidth(6), ...CircleXStyles.outerContainer, ...style }}>
      {onPressLeftArrow &&
        <TouchableOpacity
          hitSlop={{ top: 0, bottom: 0, left: 0, right: 0 }}
          style={{ ...CircleXStyles.arrows }}
          onPress={onPress}
        >
          <Text style={CircleXStyles.arrowsText} >
            {"<"}
          </Text>
        </TouchableOpacity>
      }
      <TouchableOpacity
        hitSlop={{ top: 0, bottom: 0, left: 0, right: 0 }}
        style={{ ...CircleXStyles.circleX, width: customText ? undefined : responsiveWidth(20), flex: customText ? 1 : undefined }}
        onPress={onPress}
      >
        <Text style={CircleXStyles.xText} >
          {customText || "X"}
        </Text>
      </TouchableOpacity>
      {onPressRightArrow &&
        <TouchableOpacity
          hitSlop={{ top: 0, bottom: 0, left: 0, right: 0 }}
          style={{ ...CircleXStyles.arrows }}
          onPress={onPress}
        >
          <Text style={CircleXStyles.arrowsText} >
            {">"}
          </Text>
        </TouchableOpacity>
      }
    </FadeInView>
  )
}

export const CircleXStyles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  circleX: {
    backgroundColor: "#aaaaaa",
    height: responsiveWidth(20),
    alignItems: 'center',
    borderRadius: responsiveWidth(50),
    justifyContent: 'center',
  },
  xText: {
    color: "#1c1c1c",
    textAlign: 'center',
    fontWeight: "300",
    justifyContent: 'center',
    fontSize: responsiveFontSize(20),
    transform: [{ scaleX: 2.5 }, { scaleY: 2 }],
  },
  arrows: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    alignItems: 'center',
    borderRadius: responsiveWidth(50),
    justifyContent: 'center',
  },
  arrowsText: {
    color: "#c1c1c1",
    textAlign: 'center',
    fontWeight: "100",
    justifyContent: 'center',
    fontSize: responsiveFontSize(32),
    transform: [{ scaleX: 2.5 }, { scaleY: 3 }],
  }
});
