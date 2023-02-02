import * as React from 'react';
import { InputAccessoryView, View, Keyboard, Platform, TouchableOpacity, Text } from 'react-native';
import { fonts } from '../../../theme/@stem/fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../theme/@archlife/constants';

export const KeyboardInputAccessory = (props) => {
    return (
        Platform.OS === 'ios' ?
            <InputAccessoryView nativeID={props?.nativeId ? props?.nativeId : '1'} style={{ zIndex: 100000000 }}>
                <View style={{ backgroundColor: '#1c1c1c', borderTopColor: '#ffffff15', borderTopWidth: responsiveWidth(2 * 0.24), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                        <Text allowFontScaling={true} style={{ paddingVertical: responsiveHeight(0.5), fontFamily: fonts.medium, fontSize: responsiveFontSize(16), marginRight: responsiveWidth(4.8), color: props?.customTextColor ? props.customTextColor : ("#FF69B4") }}>
                            {"Done"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </InputAccessoryView> : null
    );
}