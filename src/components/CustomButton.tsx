import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { fonts } from '../theme';

export default function CustomButton({ label, onPress, disabled, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: '#FF69B4',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        ...style
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: fonts.bold,
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
