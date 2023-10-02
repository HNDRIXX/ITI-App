import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";

import { COLORS } from "../../../constant";

export default function CalendarIndex () {
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState(null)
  
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

    const month = date.toLocaleString('default', { month: 'long'})
    const day = date.getDate()
    const year = date.getFullYear()
    
    return `${month} ${day}, ${year}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.textHeader}>Calendar</Text>
      </View>

      <Calendar
        onDayPress={dayPress}
        style={styles.calendar}
        markedDates={addMarkedDates()}
      />

      {selectedDate && (
        <View style={styles.agenda}>
          <Text style={styles.agendaHeader}>
            Events for {formatDate(selectedDate)}:
          </Text>

          {events.length === 0 ? (
            <Text style={styles.noEventsText}>
              No agenda or event
            </Text>
          ) : (
            events.map((events, index) => (
              <Text key={index} style={styles.agendaItem}>
                {events.name}
              </Text>
            ))
          )}
        </View>
      )}
      
    </View>
  )
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

  agenda: {
    padding: 16,
    margin: 20,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
  },

  agendaHeader: {
    fontSize: 16,
    color: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold',
  },

  agendaItem: {
    fontSize: 13,
    color: COLORS.clearWhite,
    fontFamily: 'Inter_400Regular',
    marginVertical: 7,
  },

  noEventsText: {
    fontSize: 13,
    color: COLORS.clearWhite,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
})