import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from 'react-native';
// import { Calendar } from 'react-native-big-calendar'
import { Alert } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import { router } from 'expo-router';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constant';
import Stack from 'expo-router';

// const events = [
//   {
//     title: 'Meeting',
//     start: new Date(2023, 8, 12, 3, 0),
//     end: new Date(2023, 8, 12, 8, 0),
//   },
//   {
//     title: 'Assesment',
//     start: new Date(2023, 8, 12, 1, 45),
//     end: new Date(2023, 8, 13, 9, 30),
//   },
//   {
//     title: 'Rest Time',
//     start: new Date(2023, 8, 13, 1, 0),
//     end: new Date(2023, 8, 13, 5, 0)
//   },
//   {
//     title: 'Coding',
//     start: new Date(2023, 8, 14, 6, 0),
//     end: new Date(2023, 8, 14, 16, 0)
//   }
// ]

const items = {
  '2023-09-13': [{ name: 'Meeting with Client A' }, { name: 'Lunch with Team' }, { name: 'Lunch with Team' }],
  '2023-09-14': [{ name: 'Meeting with Client A' }, { name: 'Lunch with Team' }],
  '2023-09-15': [{ name: 'Project Review' }, { name: 'Conference Call' }],
}

export default function EventCalendar () {

  const [isLoading, setIsLoading] = useState(true)

  
  const markDates = {}

  for (const date in items) {
    if (items.hasOwnProperty(date)) {
      markDates[date] = { marked: true, dotColor: COLORS.orange };
    }
  }

  const handleEventPress = (date) => {
    const events = items[date.dateString]

    if (events && events.length > 0) {
      const eventNames = events.map((event) => event.name).join('\n');
      Alert.alert('Event Details', `Events on ${date.dateString}:\n${eventNames}`);
    }
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <AntDesign name='back' size={30} color={COLORS.clearWhite} />
          </TouchableOpacity>
        </View>

        {!isLoading ? (
          <>
            <View style={styles.topTextWrapper}>
              <Ionicons name='ios-calendar' size={25} color={COLORS.orange} />
              <Text style={styles.textWrapper}>Calendar</Text>
            </View>

            <Calendar 
              markedDates={markDates}
              onDayPress={(date) => handleEventPress(date)}
              enableSwipeMonths
              showSixWeeks
              markingType='period'
              displayLoadingIndicators
            />

            {/* <Calendar 
              events={events} 
              height={130}
              isRTL={false}
              mode='month'
              hourRowHeight={30} 
              onPressEvent={handleEventPress}
            /> */}

            <View style={styles.agendaContainer}>
              <View style={styles.topTextWrapper}>
                <FontAwesome name='th-list' size={24} color={COLORS.orange} />
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.clearWhite
  },

  topTextWrapper: {
    margin: 13,
    flexDirection: 'row',
    alignItems: 'center'
  },

  textWrapper: {
    fontFamily: 'DMSans_700Bold',
    color: COLORS.orange,
    
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
    // borderTopColor: COLORS.tr_gray,
    // borderTopWidth: 2,
  },

  item: {
    backgroundColor: COLORS.lighterOrange,
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