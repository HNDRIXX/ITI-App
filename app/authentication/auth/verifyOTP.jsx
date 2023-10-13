import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

import { COLORS } from '../../../constant';

export default function VerifyOTPIndex() {
  const [code, setCode] = useState(['', '', '', '']);
  const codeRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const [isCustomAlertVisible, setCustomAlertVisible] = useState(false)

  const handleCodeChange = (text, index) => {
    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    if (text.length === 0 && index > 0) {
      codeRefs[index - 1].current.focus()
    } else if (text.length === 1 && index < 3) {
      codeRefs[index + 1].current.focus()
    }
  }

  const codeResult = code.join('');
  const isSubmitDisabled = code.some((value) => value.length !== 1);

  const openCustomAlert = () => {
    setCustomAlertVisible(true);
  }

  const closeCustomAlert = () => {
    setCustomAlertVisible(false)

    router.push(`/authentication/base/resetPass`)
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <AntDesign name='arrowleft' size={28} color={COLORS.orange} />
      </TouchableOpacity>

      <View style={styles.wrapper}>
        <Text style={styles.verificationText}>Verification</Text>
        <Text style={styles.subText}>We sent a 4-digit verification code to your email address</Text>

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

        <View style={styles.resendWrapper}>
          <Text>Didn't receive a code?</Text>
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.verifyBtn, isSubmitDisabled ? styles.disabledBtn : null]}
          onPress={openCustomAlert}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.textBtn}>VERIFY</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Alert */}
      <CustomAlert visible={isCustomAlertVisible} onClose={closeCustomAlert} />
    </View>
  )
}

// Custom Alert Component
const CustomAlert = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalView}>
        <View style={styles.modalWrapper}>
          <AntDesign 
            name={'checkcircle'}
            size={70}
            color={COLORS.green}
          />

          <Text style={styles.verifiedText}>Verified</Text>
          <Text style={styles.verifiedSubText}>You have successfully verified the account.</Text>

          <TouchableOpacity 
            onPress={onClose}
            style={styles.updatePassBtn}
          >
            <Text style={styles.updatePassText}>UPDATE PASSWORD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  backBtn: {
    width: 60,
    height: 60,
    alignItems: 'center',
    marginTop: 60,
  },

  verificationText: {
    fontFamily: 'Inter_700Bold',
    color: COLORS.black,
    fontSize: 26,
    textAlign: 'center',
  },

  subText: {
    fontFamily: 'Inter_400Regular',
    color: COLORS.black,
    textAlign: 'center',
    alignSelf: 'center',
    width: '70%',
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
    marginHorizontal: 12,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 27,
    backgroundColor: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold',

    elevation: 5,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5, 
    shadowRadius: 5, 
  },

  singleInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: COLORS.clearWhite,
    borderRadius: 30,
    marginBottom: 15,

    elevation: 7,
    shadowColor: COLORS.tr_gray,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5, 
    shadowRadius: 5,
  },

  resendWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 100,
  },
  
  resendButton: {
    paddingHorizontal: 5,
  },

  resendText: {
    color: COLORS.orange,
    fontFamily: 'Inter_700Bold',
  },

  verifyBtn: {
    backgroundColor: COLORS.orange,
    padding: 14,
    alignItems: 'center',
    alignSelf: 'center',
    width: 180,
    borderRadius: 30,
  },

  textBtn: {
    color: COLORS.clearWhite,
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 15,
  },

  disabledBtn: {
    backgroundColor: 'gray',
    opacity: 0.3,
  },

  modalView: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modalWrapper: {
    backgroundColor: COLORS.clearWhite, 
    padding: 30, 
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  verifiedText: {
    color: COLORS.darkGray,
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
  },

  verifiedSubText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },

  updatePassBtn: {
    backgroundColor: COLORS.orange,
    padding: 15,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 20,
    width: 200,
  },

  updatePassText: {
    textAlign: 'center',
    color: COLORS.clearWhite,
    fontFamily: 'Inter_800ExtraBold',
  }

})