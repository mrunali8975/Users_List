import {View, Text, TextInput} from 'react-native';
import React from 'react';

const CustomInput = ({placeholder, onChangeText, value}) => {
  return (
    <TextInput
      value={value}
      onChangeText={val => onChangeText(val)}
      placeholder={placeholder}
      placeholderTextColor={'black'}
      style={{
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10,
        color: 'black',
      }}
    />
  );
};

export default CustomInput;
