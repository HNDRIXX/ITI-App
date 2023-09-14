// import React, { useState } from 'react';
// import { Calendar } from 'react-native-calendars';
// import { View, Text } from 'react-native';
// import { COLORS } from '../../constant';

// export default function EventCalendar() {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [agenda, setAgenda] = useState([]);

//   // Sample agenda data with dates
//   const agendaData = {
//     '2023-09-15': ['Agenda item 1', 'Agenda item 2'],
//     '2023-09-20': ['Agenda item 3'],
//     // Add more dates and agenda items as needed
//   };

//   const handleDayPress = (day) => {
//     const selectedDateString = day.dateString;
//     setSelectedDate(selectedDateString);

//     // Get agenda items for the selected date
//     const agendaItems = agendaData[selectedDateString] || [];
//     setAgenda(agendaItems);
//   };

//   // Create an object to store marked dates for the Calendar component
//   const markedDates = {};
//   for (const date in agendaData) {
//     markedDates[date] = {
//       selected: true,
//     };
//   }

//   return (
//     <View>
//       <Calendar
//         onDayPress={handleDayPress}
//         markedDates={markedDates} // Use the dynamically generated marked dates
//       />
//       <View>
//         <Text>Agenda for {selectedDate}:</Text>
//         {agenda.map((item, index) => (
//           <Text key={index}>{item}</Text>
//         ))}
//       </View>
//     </View>
//   );
// }
