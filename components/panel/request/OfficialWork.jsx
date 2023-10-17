import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const data = [
  { 
    status: 'Filed', 
    name: 'Listing 1', 
    currDate: 'Sept 18, 2023',
    requestedSched: '7:00 AM - 4:00 PM',
    reason: '----'
  },
  { 
    status: 'Reviewed', 
    name: 'Listing 2', 
    currDate: 'Sept 18, 2023',
    requestedSched: '7:00 AM - 4:00 PM',
    reason: '----'
  },
  { 
    status: 'Approved', 
    name: 'Listing 3', 
    currDate: 'Sept 18, 2023',
    requestedSched: '7:00 AM - 4:00 PM',
    reason: '----'
  },
  { 
    status: 'Cancelled', 
    name: 'Listing 4', 
    currDate: 'Sept 18, 2023',
    requestedSched: '7:00 AM - 4:00 PM',
    reason: '----'
  },
  { 
    status: 'Cancelled', 
    name: 'Listing 5', 
    currDate: 'Sept 18, 2023',
    requestedSched: '7:00 AM - 4:00 PM',
    reason: '----'
  },
];

export default function App() {
    const [filterText, setFilterText] = useState('');

    const filteredData = data.filter(item =>
      item.status.toLowerCase().includes(filterText.toLowerCase()) ||
      item.currDate.toLowerCase().includes(filterText.toLowerCase())
    );
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search by Status or Date"
          onChangeText={text => setFilterText(text)}
          value={filterText}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Status: {item.status}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Date: {item.currDate}</Text>
              <Text>Schedule: {item.requestedSched}</Text>
              <Text>Reason: {item.reason}</Text>
            </View>
          )}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 8,
    },
    item: {
      backgroundColor: '#f5f5f5',
      padding: 16,
      marginBottom: 10,
    },
});
