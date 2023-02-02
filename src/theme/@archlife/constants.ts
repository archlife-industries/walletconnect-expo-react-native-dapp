import { Dimensions, Platform, PixelRatio } from 'react-native';
import { colors } from '../@stem/colors';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const scale = windowWidth / 414;

export const nullProfileImageLink = "https://github.com/Zernach/zernach.github.io/blob/master/images/null-profile-image-head-faceless.png?raw=true"

export const responsiveLineHeight = (fontSize: number) => {
    const multiplier = fontSize > 20 ? 1.5 : 1
    return parseInt(fontSize + fontSize * multiplier, 10)
}

export const responsiveWidth = (percentage: number) => {
    if (Platform.OS === 'android') {
        return (PixelRatio.roundToNearestPixel(percentage * scale * 4.2))
    } else {
        return windowWidth / 100 * percentage
    }
}

export const responsiveHeight = (percentage: number) => {
    if (Platform.OS === 'android') {
        return (PixelRatio.roundToNearestPixel(percentage * scale * 8))
    } else {
        return windowHeight / 100 * percentage
    }
}

export const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

export const responsiveFontSize = (size: number) => {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return (PixelRatio.roundToNearestPixel(newSize))
    } else {
        return (PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}
export const shadow = (multiplier: number) => ({
    shadowColor: colors.black,
    shadowRadius: 1 * multiplier,
    shadowOffset: { width: 0, height: 1 * multiplier },
    shadowOpacity: 0.3 * multiplier,
    elevation: 2,
});