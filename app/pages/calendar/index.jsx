import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Calendar } from "react-native-calendars";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import moment from "moment";

import { COLORS } from "../../../constant";
import TimeSheetPrompt from "../../../components/note/CalendarPrompt";

export default function CalendarIndex() {
  const [currDate, setCurrDate] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState(null)
  const [previousDate, setPreviousDate] = useState(null)
  const [nextDate, setNextDate] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const scrollViewRef = useRef(null)

  const valueEvents = {
    '20231001': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '20231002': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '20231003': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '20231004': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '20231005': [ { event: 'Approved Leave', status: 'Leave', }, ],
    '20231006': [ { event: 'Government Declared Holiday', status: 'Holiday' } ],
    '20231007': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231008': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231018': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231019': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231020': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231030': [ { event: 'Election', status: 'Holiday' } ],
    '20231031': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day' } ],
  }

  const updatedValueEvents = {}

  for (const key in valueEvents) {
    const formattedDate = key.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    updatedValueEvents[formattedDate] = valueEvents[key]
  }
  
  const today = moment().format("MMMM DD, YYYY")
  const todayDate = moment(today, "MMMM DD, YYYY")
  const yesterday = todayDate.clone().subtract(1, 'days')
  const tomorrow = todayDate.clone().add(1, 'days')

  const addMarkedDates = () => {
    const marked = {}
    for (const date in updatedValueEvents) {
      marked[date] = { marked: true }
    }
    return marked
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    
    return `${month} ${day}, ${year}`
  }
  
  const getPreviousDate = (dateString) => {
    const currentDate = new Date(dateString)
    const previousDate = new Date(currentDate)
    previousDate.setDate(currentDate.getDate() - 1)
    return formatDate(previousDate.toISOString())
  }

  const getNextDate = (dateString) => {
    const currentDate = new Date(dateString)
    const previousDate = new Date(currentDate)
    previousDate.setDate(currentDate.getDate() + 1)
    return formatDate(previousDate.toISOString())
  }

  const dayPress = (day) => {
    setSelectedDate(day.dateString)
    const previousDate = getPreviousDate(day.dateString)
    const nextDate = getNextDate(day.dateString)
    setEvents(updatedValueEvents[day.dateString] || [])
    setPreviousDate(previousDate)
    setNextDate(nextDate)
  }  
  
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

  const defaultDate = (originalDate) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ]

    const parts = originalDate.split(' ')
  
    const month = monthNames.indexOf(parts[0]) + 1
    const day = parseInt(parts[1].replace(',', ''), 10)
    const year = parseInt(parts[2], 10)
  
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  
    return formattedDate
  }

  const checkColor = (valueColor) => {
    let color

    switch (valueColor) {
      case "Work Day":
        color = COLORS.green
        break

      case "Holiday":
        color = COLORS.red
        break

      case "Leave": 
        color = COLORS.filed
        break
      
      case "Rest Day": 
        color = COLORS.purple
        break

      default:
        color = COLORS.darkGray
    }

    return color
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
            tintColor={COLORS.powderBlue}
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
            todayTextColor: COLORS.powderBlue,
            arrowColor: COLORS.orange,
          }}
          markedDates={addMarkedDates()}
        />

        {selectedDate ? (
          <ScrollView style={styles.agenda}>
            <View style={styles.agendaDateWrapper}>
              <Text style={styles.todayText}>
                {
                  (formatDate(selectedDate) == moment().format("MMMM DD, YYYY")) ?
                    "Today" : 
                  (formatDate(selectedDate) == yesterday.format("MMMM DD, YYYY")) ?
                    "Yesterday" :
                  (formatDate(selectedDate) == tomorrow.format("MMMM DD, YYYY")) ?
                    "Tommorow" : "Event"
                }
              </Text>
              <Text style={styles.dayAgenda}>{formatDate(selectedDate)}</Text>
            </View>

            <View style={styles.itemWrapper}>
                {events.map((event, index) => {
                  const valueColor = event.status
                  const color = checkColor(valueColor)

                  return (
                    <View style={styles.dayStatusWrapper(color)} key={index}>
                      <FontAwesome
                        name="circle"
                        size={40}
                        color={color}
                        style={styles.topCircle}
                      />

                      <Text style={styles.dayStatusText}>
                        {event.status}
                      </Text>
                    </View>
                  )
                })}

              <View style={styles.dayContentWrapper}>
                {events.length === 0 ? (
                  <Text style={styles.noEventsText}>
                    No agenda or event
                  </Text>
                ) : (
                  events.map((event, index) => (
                    <Text key={index} style={styles.dayContentText}>
                      {event.event}
                    </Text>
                  ))
                )}
              </View>

              <View style={styles.prevNextContainer}>
                <View style={styles.prevNextDateWrapper}>
                  <Text style={styles.prevNextText}>Previous</Text>
                  <Text style={styles.prevNextDayText}>{previousDate}</Text>
                </View>

                {events.map((event, index) => {
                  const valueColor = updatedValueEvents[defaultDate(previousDate)] ? updatedValueEvents[defaultDate(previousDate)][0].status : null

                  const color = checkColor(valueColor)

                  return (
                    <View style={styles.dayBelowStatusWrapper(color)} key={index}>
                      <FontAwesome
                        name="circle"
                        size={27}
                        color={color}
                        style={styles.topCircle}
                      />

                      <Text style={styles.belowDayStatusText}>
                        {updatedValueEvents[defaultDate(previousDate)] ? (
                          updatedValueEvents[defaultDate(previousDate)][0].status
                        ) : 'Empty'}
                      </Text>
                    </View>
                  )
                })}
              </View>

              <View style={styles.prevNextContainer}>
                <View style={styles.prevNextDateWrapper}>
                  <Text style={styles.prevNextText}>Upcoming</Text>
                  <Text style={styles.prevNextDayText}>{nextDate}</Text>
                </View>

                {events.map((event, index) => {
                  const valueColor = updatedValueEvents[defaultDate(nextDate)] ? updatedValueEvents[defaultDate(nextDate)][0].status : null

                  const color = checkColor(valueColor)

                  return (
                    <View style={styles.dayBelowStatusWrapper(color)} key={index}>
                      <FontAwesome
                        name="circle"
                        size={27}
                        color={color}
                        style={styles.topCircle}
                      />

                      <Text style={styles.belowDayStatusText}>
                        {updatedValueEvents[defaultDate(nextDate)] ? (
                          updatedValueEvents[defaultDate(nextDate)][0].status
                        ) : 'Empty'}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.promptView}>
            <TimeSheetPrompt />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.clearWhite
  },

  topHeader: {
    padding: 3,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: COLORS.powderBlue,
  },

  textHeader: {
    color: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
  },

  calendarView: {
    paddingTop: 5,
    height: 380,
  },

  agendaDateWrapper: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  agenda: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 10,
    elevation: 15,
    shadowColor: COLORS.darkGray,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset : { width: 1, height: 5},
    backgroundColor: COLORS.clearWhite,
  },

  todayText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: COLORS.darkGray,
  },  

  dayAgenda: {
    fontSize: 12,
    color: COLORS.darkGray,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },

  itemWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.clearWhite,
  },

  topCircle: {
    position: 'absolute',
    zIndex: 99,
    marginLeft: -1,
  },

  dayStatusWrapper: (color) => ({
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%',
      height: 35,
      paddingLeft: 40,
      borderRadius: 50,
      borderColor: color,
      borderColor: color ? COLORS.clearWhite : null,
      backgroundColor: COLORS.clearWhite,
      elevation: 5,
      // shadowColor: COLORS.darkGray,
      // shadowOpacity: 0.1,
      // shadowRadius: 2,
      // shadowOffset : { width: 1, height: 5},
    }),

    dayBelowStatusWrapper: (color) => ({
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%',
      height: 25,
      paddingLeft: 40,
      borderRadius: 50,
      borderColor: color,
      borderWidth: 1,
      backgroundColor: COLORS.clearWhite,
    }),

    belowDayStatusText: {
      fontSize: 10,
      fontFamily: 'Inter_400Regular'
    },

  dayStatusText: {
    textAlign: 'center',
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },

  dayContentWrapper: {
    padding: 20,
    borderBottomColor: COLORS.orange,
    borderBottomWidth: 2,
  },

  dayContentText: {
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
  },

  prevNextContainer: {
    paddingHorizontal: 10,
    padding: 5,
  },

  prevNextDateWrapper: {

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  prevNextText: {
    fontFamily: 'Inter_500Medium'
  },

  prevNextDayText: {
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
    color: COLORS.darkGray,
    fontSize: 12,
  },

  noEventsText: {
    fontSize: 13,
    textAlign: 'center',
    color: COLORS.darkGray,
    fontFamily: 'Inter_400Regular',
  },

  scrollView: {
    flexGrow: 1,
  },
});