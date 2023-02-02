import { Platform } from "react-native"

let fonts = {
    bold: '',
    medium: '',
    semiBold: '',
    italic: '',
}

if (Platform.OS === 'android') {
    fonts = {
        bold: 'Roboto',
        medium: 'Roboto',
        semiBold: 'Roboto',
        italic: 'Roboto',
    }
} else {
    fonts = {
        bold: 'AvenirNext-Bold',
        medium: 'AvenirNext-Medium',
        semiBold: 'AvenirNext-DemiBold',
        italic: 'AvenirNext-Italic',
    }
}

export { fonts }