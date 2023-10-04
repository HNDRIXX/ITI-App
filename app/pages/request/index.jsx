import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RequestButton from '../../../components/button/RequestButton'

function index() {
  return (
    <View style={styles.container}>
      <RequestButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default index