import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { COLORS } from '../../../constant'
import RequestButton from '../../../components/button/RequestButton'

export default function RequestIndex() {
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.textHeader}>Request</Text>
      </View>
      
      <RequestButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  topHeader: {
    padding: 3,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: COLORS.blue,
  },

  textHeader: {
    color: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
  },
})