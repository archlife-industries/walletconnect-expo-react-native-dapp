import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { fonts } from '../theme';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
        alignItems: 'center',
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: 'white', fontFamily: fonts.medium }}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: 'white', fontFamily: fonts.medium }}
          value={value}
          placeholderTextColor="#ffffff99"
          onChangeText={onChangeText}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction} style={{ borderColor: '#FF69B4', borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#1c1c1c99' }}>
        <Text style={{ color: '#FF69B4', fontFamily: fonts.bold }}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
