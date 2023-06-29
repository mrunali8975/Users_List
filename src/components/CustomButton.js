import { View, Text,Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({title,onPressed}) => {
  return (
    <Pressable
      onPress={onPressed}
      style={{
      width: 65, height: 35,
      backgroundColor: 'red', alignItems: 'center',
      justifyContent: 'center', borderRadius: 18,
    }}>
          <Text style={{color:'white'}}>{title }</Text>
   </Pressable>
  )
}

export default CustomButton