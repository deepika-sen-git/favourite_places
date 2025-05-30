import { View, Text, Pressable, StyleSheet, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

const IconButton = ({ name, size, color, onPress }) => {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  button: {
    margin: 4,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressed: {
    opacity: 0.7,
  }
})