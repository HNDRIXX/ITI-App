import React from 'react';
import { View, StyleSheet } from 'react-native';
import EventCalendar from '../../../components/home/EventCalendar'

export default function CalendarPage() {
  return (
    <View style={styles.container}>
      <EventCalendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
