import * as React from "react"
import { useState } from "react";
import { Image, Animated } from "react-native"
import { responsiveWidth } from '../../../theme/@archlife/constants';
import { FadeInImageProps } from "./fade-in-image-interface"

/**
 * Describe your new component here...
 */
export const FadeInImage = (props: FadeInImageProps) => {

  // INCOMING PROPS
  const {
    imageUri,
    localFile,
    imageStyle,
    style,
    duration,
    hasBorderRadius = true,
    onError
  } = props

  const [photoFadeOpacity] = useState(new Animated.Value(0));
  const fadeInPhoto = () => {
    Animated.timing(photoFadeOpacity, {
      toValue: 1,
      duration: duration || 400,
      useNativeDriver: false
    }).start();
  }

  return (
    <Animated.View style={{ opacity: photoFadeOpacity, ...style }}>
      <Image
        onError={onError}
        onLoad={() => {
          fadeInPhoto()
        }}
        source={localFile || { uri: imageUri }}
        // onError={(err) => setSelectedUri("https://github.com/Zernach/zernach.github.io/blob/master/images/empty.png?raw=true")}
        style={{
          flex: 1,
          borderRadius: hasBorderRadius ? responsiveWidth(2) : null,
          backgroundColor: '#282D3300',
          ...imageStyle
        }}
      />
    </Animated.View>
  )
}
