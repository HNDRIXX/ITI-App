import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { Calendar } from 'react-native-big-calendar'
import { Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { router } from 'expo-router';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constant';

const events = [
  {
    title: 'Meeting',
    start: new Date(2023, 8, 12, 3, 0),
    end: new Date(2023, 8, 12, 8, 0),
  },
  {
    title: 'Assesment',
    start: new Date(2023, 8, 12, 1, 45),
    end: new Date(2023, 8, 12, 9, 30),
  },
  {
    title: 'Rest Time',
    start: new Date(2023, 8, 13, 1, 0),
    end: new Date(2023, 8, 13, 5, 0)
  },
  {
    title: 'Coding',
    start: new Date(2023, 8, 14, 6, 0),
    end: new Date(2023, 8, 14, 16, 0)
  }
]

const handleEventPress = (event) => {
  Alert.alert(
    'Event Details',
    `Title: ${event.title}\nStart Time: ${event.start.toString()}\nEnd Time: ${event.end.toString()}`,
  )
}

export default function EventCalendar () {
  const [isLoading, setIsLoading] = useState(true)
  const items = {
    '2023-09-13': [{ name: 'Meeting with Client A' }, { name: 'Lunch with Team' }, { name: 'Lunch with Team' }],
    '2023-09-14': [{ name: 'Meeting with Client A' }, { name: 'Lunch with Team' }],
    '2023-09-15': [{ name: 'Project Review' }, { name: 'Conference Call' }],
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <AntDesign name='back' size={30} color={COLORS.clearWhite} />
          </TouchableOpacity>
        </View>

        {!isLoading ? (
          <>
            <View style={styles.topTextWrapper}>
              <Ionicons name='ios-calendar' size={25} color={COLORS.baseOrange} />
              <Text style={styles.textWrapper}>Calendar</Text>
            </View>

            <Calendar 
              events={events} 
              height={130}
              isRTL={false}
              mode='3days'
              hourRowHeight={30} 
              onPressEvent={handleEventPress}
            />

            <View style={styles.agendaContainer}>
              <View style={styles.topTextWrapper}>
                <FontAwesome name='th-list' size={24} color={COLORS.baseOrange} style={{ verticalAlign: 'middle'}} />
                <Text style={styles.textWrapper}>Weekly Events</Text>
              </View>

              <Agenda
                items={items}
                renderItem={(item) => (
                  <View style={styles.itemContainer}>
                    <TouchableOpacity style={styles.item}>
                      <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}

                renderEmptyData={(item) => (
                  <View style={styles.item}>
                    <Text style={styles.itemText}>No agenda for this day.</Text>
                  </View>
                )}
              />
            </View>
          </>
        ) : ( <View style={styles.loader}><ActivityIndicator size={'large'} color={COLORS.baseOrange} /></View> ) }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  topTextWrapper: {
    margin: 13,
    flexDirection: 'row',
  },

  textWrapper: {
    fontFamily: 'DMSans_700Bold',
    color: COLORS.baseOrange,
    fontSize: 21,
    paddingLeft: 10,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  topContainer: {
    backgroundColor: COLORS.blue,
    paddingTop: 40,
    paddingBottom: 10,
  },

  backButton: {
    paddingHorizontal: 10,
  },

  agendaContainer: {
    flex: 1,
    borderTopColor: COLORS.tr_gray,
    borderTopWidth: 2,
  },

  item: {
    backgroundColor: COLORS.orange,
    padding: 20,
    marginVertical: 8,

    bottom: 0,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  itemText: {
    color: COLORS.clearWhite,
    fontFamily: 'DMSans_500Medium'
  },
})