import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';

import { COLORS } from '../../../constant'
import BottomNavigation from '../../../components/button/BottomNavigation';
import ChangeOfSchedulePanel from '../../../components/panel/request/ChangeOfSchedule';
import OfficialWork from '../../../components/panel/request/OfficialWork';
import OverTime from '../../../components/panel/request/OverTime';
import Leave from '../../../components/panel/request/Leave';

export default function RequestIndex() {
  const data = [
    { title: 'Change of Schedule' },
    { title: 'Official Work' },
    { title: 'Overtime' },
    { title: 'Offset' },
    { title: 'Leave' },
    { title: 'Missed Logs' },
    { title: 'CTO' },
  ];

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')

  const handleButtonPress = (index, title) => {
      setSelectedButtonIndex(index)
      setDisplayText(`This is Button ${index}`)
  }

  return (
    <Animatable.View
          animation={'fadeIn'}
          duration={900}
          style={{ opacity: 1, flex: 1 }}
    >
      <View style={styles.container}>
        <StatusBar style="light"/>

        <View style={styles.topHeader}>
          <Text style={styles.textHeader}>Request</Text>
        </View>
        
        <View style={styles.wrapper}>
          <FlatList
              data={data}
              renderItem={({ item, index }) => (
                  <TouchableOpacity
                      style={[
                          styles.button,
                          selectedButtonIndex === index && styles.selectedButton,
                      ]}
                      onPress={() => handleButtonPress(index, item.title)}
                  >
                      <Text 
                          style={[
                              styles.buttonText,
                              selectedButtonIndex === index && styles.selectedTextButton
                          ]}
                      >{item.title}</Text>
                  </TouchableOpacity>
              )}
              style={styles.buttonList}
              horizontal
              showsHorizontalScrollIndicator={false}
          />
      </View>

      {
        selectedButtonIndex == 0 ? ( <ChangeOfSchedulePanel onAnimate={true} /> )
        : selectedButtonIndex == 1 ? ( <OfficialWork onAnimate={true} /> )
        : selectedButtonIndex == 2 ? ( null )
        : selectedButtonIndex == 3 ? ( null )
        : selectedButtonIndex == 4 ? ( null )
        : selectedButtonIndex == 5 ? ( null )
        : selectedButtonIndex == 6 ? ( null )
        : ( null )
      }
      
      <BottomNavigation active={"request"} />
      </View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topHeader: {
    padding: 3,
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: COLORS.powderBlue,
  },

  textHeader: {
    color: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
  },

  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.shadowGray,
    borderBottomWidth: 2,
    marginHorizontal: 10,
  },

  button: {
      width: 'auto',
      height: 35,
      paddingHorizontal: 20,
      marginRight: 20,
      borderRadius: 15,
      marginVertical: 13,
      marginLeft: 0,
      alignItems: 'center',
      justifyContent: 'center',
  },

  buttonText: {
      color: COLORS.tr_gray,
      fontSize: 17,
      fontFamily: 'Inter_600SemiBold'
  },

  selectedButton: {
      backgroundColor: COLORS.orange,
      elevation: 7,
      shadowColor: COLORS.darkGray,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: .2,
      shadowRadius: 10,
  },

  selectedTextButton: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold'
  }
})