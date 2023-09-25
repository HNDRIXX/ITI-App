import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';


import { COLORS } from '../../../constant';

export default function VerifyOTPIndex () {
  const [code, setCode] = useState(['', '', '', '', ''])
  const codeRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

  const handleCodeChange = (text, index) => {
    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    if (text.length === 1 && index < 4) {
      codeRefs[index + 1].current.focus()
    }
  }
  
  const codeResult = code.join('')
  const isSubmitDisabled = code.some((value) => value.length !== 1)

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />

      <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => router.back()}
      >
          <AntDesign name='arrowleft' size={23} color={COLORS.blue} />
      </TouchableOpacity>

      <View style={styles.wrapper}>
        <Text style={styles.label}>Verify</Text>
        <Text style={styles.subText}>Enter the received input.</Text>

        <View style={styles.codeContainer}>
          {code.map((value, index) => (
            <TextInput
              key={index}
              style={styles.input}
              onChangeText={(text) => handleCodeChange(text, index)}
              value={value}
              keyboardType="numeric"
              maxLength={1}
              ref={codeRefs[index]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, isSubmitDisabled ? styles.disabledBtn : null]}
          onPress={() => console.log(codeResult)} 
        >
          <Text style={styles.textBtn}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  backBtn: {
    width: 50,
    height: 50,
    alignItems: 'center',
    marginTop: 40,
  },

  label: {
    fontFamily: 'Inter_800ExtraBold',
    color: COLORS.orange,
    fontSize: 40,
  },

  subText: {
    fontFamily: 'Inter_400Regular',
    color: COLORS.darkGray
  },

  wrapper: {
    flex: 1,
    margin: 30,
    marginTop: 0,
    justifyContent: 'center',
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },

  input: {
    width: 60,
    height: 60,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 27,
    fontFamily: 'Montserrat_600SemiBold'
  },

  submitBtn: {
    backgroundColor: COLORS.blue,
    padding: 14,
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    borderRadius: 10,
  },

  bottomContainer: {
    flex:  1,
  },

  disabledBtn: {
      backgroundColor: 'gray',
      opacity: 0.3,
  },

  textBtn: {
    color: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
  }
})