import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { Calendar } from "react-native-calendars";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { COLORS } from "../../../constant";

export default function CalendarIndex() {
  const [currDate, setCurrDate] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState(null)
  const [previousDate, setPreviousDate] = useState(null)
  const [nextDate, setNextDate] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const scrollViewRef = useRef(null)

  // Static Data
  const valueEvents = {
    '2023-10-01': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '2023-10-02': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '2023-10-03': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '2023-10-04': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '2023-10-05': [ { event: 'Approved Leave', status: 'Leave', }, ],
    '2023-10-06': [ { event: 'Government Declared Holiday', status: 'Holiday' } ],
    '2023-10-07': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '2023-10-30': [ { event: 'Election', status: 'Holiday' } ],
    '2023-10-31': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day' } ],
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
    setEvents(valueEvents[day.dateString] || [])
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
    // Define an array to map month names to month numbers
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  
    // Split the original date into parts
    const parts = originalDate.split(' ');
  
    // Extract the month, day, and year
    const month = monthNames.indexOf(parts[0]) + 1; // Adding 1 because the array is 0-based
    const day = parseInt(parts[1].replace(',', ''), 10); // Parse day as an integer
    const year = parseInt(parts[2], 10); // Parse year as an integer
  
    // Create the formatted date
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
    return formattedDate;
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
              <Text style={styles.todayText}>Today</Text>
              <Text style={styles.dayAgenda}>{formatDate(selectedDate)}</Text>
            </View>

            <View style={styles.itemWrapper}>
              <View style={styles.dayStatusWrapper}>
                {events.map((event, index) => {

                  let color
                  switch (event.status) {
                    case "Work Day":
                      color = COLORS.green
                      break

                    case "Holiday":
                      color = COLORS.red
                      break

                    case "Leave": 
                      color = COLORS.yellow
                      break
                    
                    case "Rest Day": 
                      color = COLORS.purple
                      break

                    default:
                      color = COLORS.orange
                  }

                  return (
                    <FontAwesome
                      key={index}
                      name="circle"
                      size={40}
                      color={color}
                      style={{ paddingLeft: 5 }}
                    />
                  )
                })}

                {events.map((event, index) => (
                  <Text key={index} style={styles.dayStatusText}>
                    {event.status}
                  </Text>
                ))}

              </View>

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

                <View style={styles.dayStatusWrapper}>
                  <FontAwesome 
                    name={'circle'}
                    size={25}
                    color={COLORS.powderBlue}
                    style={{ paddingLeft: 5, }}
                  />

                  <Text style={styles.belowDayStatusText}>
                    {valueEvents[defaultDate(previousDate)] ? (
                      valueEvents[defaultDate(previousDate)][0].status
                    ) : 'Empty'}
                  </Text>
                </View>
              </View>

              <View style={styles.prevNextContainer}>
                <View style={styles.prevNextDateWrapper}>
                  <Text style={styles.prevNextText}>Upcoming</Text>
                  <Text style={styles.prevNextDayText}>{nextDate}</Text>
                </View>

                <View style={styles.dayStatusWrapper}>
                  <FontAwesome 
                    name={'circle'}
                    size={25}
                    color={COLORS.powderBlue}
                    style={{ paddingLeft: 5 }}
                  />

                  <Text style={styles.belowDayStatusText}>
                    {valueEvents[defaultDate(nextDate)] ? (
                      valueEvents[defaultDate(nextDate)][0].status
                    ) : 'Empty'}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.promptView}>
            <AntDesign
              name={'select1'}
              size={70}
              color={COLORS.powderBlue}
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
    // alignItems: 'center',
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

  dayStatusWrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    borderRadius: 50,
    backgroundColor: COLORS.clearWhite,
    elevation: 5,
    shadowColor: COLORS.darkGray,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset : { width: 1, height: 5},
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
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },

  belowDayStatusText: {
    padding: 10,
    fontFamily: 'Inter_400Regular'
  },

  noEventsText: {
    fontSize: 13,
    textAlign: 'center',
    color: COLORS.darkGray,
    fontFamily: 'Inter_400Regular',
  },

  promptView: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
    elevation: 15,
    shadowColor: COLORS.darkGray,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset : { width: 1, height: 5},
    backgroundColor: COLORS.clearWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },

  promptText: {
    width: 180,
    padding: 20,
    color: COLORS.powderBlue,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },

  scrollView: {
    flexGrow: 1,
  },
});
