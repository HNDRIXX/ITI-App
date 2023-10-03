import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "../../../constant";

export default function CalendarIndex() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const scrollViewRef = useRef(null)

  const valueEvents = {
    '2023-10-02': [{ name: 'Test 1' }, { name: 'Test 2' }],
    '2023-10-05': [{ name: 'Test 2' }, { name: 'Test 3' }, { name: 'Test 4' }]
  }

  const dayPress = (day) => {
    setSelectedDate(day.dateString)
    setEvents(valueEvents[day.dateString] || [])
  }

  const addMarkedDates = () => {
    const marked = {}
    
    for (const date in valueEvents) {
      marked[date] = { marked: true }
    }

    return marked
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    
    return { month, day, year }
  }

  const formattedDate = formatDate(selectedDate)

  const refresh = () => {
    setRefreshing(true)
    setSelectedDate(null)
    setEvents(null)

    setTimeout(() => {
      setRefreshing(false)

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
      }
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.textHeader}>Calendar</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={COLORS.blue}
          />
        }
      >
        <Calendar
          onDayPress={dayPress}
          style={styles.calendarView}
          enableSwipeMonths
          headerStyle={{
            backgroundColor: COLORS.clearWhite,
          }}
          theme={{
            dotColor: COLORS.orange,
            todayTextColor: COLORS.blue,
            arrowColor: COLORS.orange,
          }}
          markedDates={addMarkedDates()}
        />

        <Text style={styles.bodyTitle}>Calendar Event</Text>

        {selectedDate ? (
          <View style={styles.agenda}>
            <View style={styles.agendaDateWrapper}>
              <Text style={styles.dayAgenda}>{formattedDate.day}</Text>
              <Text style={styles.subAgenda}>{formattedDate.month}, {formattedDate.year}</Text>
            </View>

            <View style={styles.itemWrapper}>
              {events.length === 0 ? (
                <Text style={styles.noEventsText}>
                  No agenda or event
                </Text>
              ) : (
                events.map((event, index) => (
                  <Text key={index} style={styles.agendaItem}>
                    {event.name}
                  </Text>
                ))
              )}
            </View>
          </View>
        ) : (
          <View style={styles.promptView}>
            <AntDesign
              name={'select1'}
              size={70}
              color={COLORS.tr_gray}
            />

            <Text style={styles.promptText}>Select any day in the calendar to display.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  bodyTitle: {
    padding: 10,
    fontSize: 18,
    letterSpacing: .2,
    textAlign: 'center',
    backgroundColor: COLORS.lightBlue,
    color: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold',
  },

  agendaDateWrapper: {
    padding: 20,
  },

  agenda: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  itemWrapper: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    padding: 20,
    height: '100%',
    backgroundColor: COLORS.lightOrange,
    shadowColor: COLORS.tr_gray,
    shadowOpacity: 0.6,
    shadowOffset: { width: 1, height: 1 }
  },

  dayAgenda: {
    fontSize: 60,
    color: COLORS.blue,
    textAlign: 'center',
    fontFamily: 'Inter_800ExtraBold',
  },

  subAgenda: {
    fontFamily: 'Inter_300Light',
  },

  agendaItem: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: COLORS.clearWhite,
    marginVertical: 7,
  },

  noEventsText: {
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    color: COLORS.clearWhite,
    fontFamily: 'Inter_400Regular',
  },

  promptView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  promptText: {
    width: 180,
    padding: 20,
    color: COLORS.tr_gray,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },

  scrollView: {
    flexGrow: 1,
  },
});
