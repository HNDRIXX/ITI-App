import { AntDesign } from '@expo/vector-icons';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { useRouter } from 'expo-router'
import { COLORS } from '../../constant';
import { StackRouter } from '@react-navigation/native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd']
      ]
    }
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state
    const router = useRouter()

    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    )

    const onGoBack = () => {
      router.back()
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
            <AntDesign name='back' size={30} color={COLORS.clearWhite} />
          </TouchableOpacity>
        </View>

        <View style={styles.bodyCntr}>
          <View style={styles.bodyTxtCtnr}>
            <Text style={styles.bodyTxtTitle}>Test Page</Text>
            <Text style={styles.bodyTxtSub}>The dolor sit al</Text>
          </View>

          <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.textHead} />
            {
              state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellData} textStyle={styles.textRow}/>
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },

  topContainer: {
    backgroundColor: COLORS.blue,
    paddingTop: 40,
    paddingBottom: 10,
  },

  backButton: {
    paddingHorizontal: 10,
  },

  head: { 
    height: 50,
    backgroundColor: COLORS.orange
  },

  textHead: { 
    margin: 6,
    color: COLORS.clearWhite,
    textAlign: 'center',
    fontFamily: 'DMSans_500Medium'
  },

  textRow: { 
    margin: 6,
    color: COLORS.darkGray,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center'
  },

  row: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.lightGray2,
  },

  btn: { 
    width: 58, 
    height: 18, 
    backgroundColor: '#78B7BB',  
    borderRadius: 2 
  },

  btnText: { 
    textAlign: 'center', 
    color: '#fff'
  },

  bodyCntr: {
    margin: 13,
  },

  bodyTxtCtnr: {
    marginBottom: 15
  },

  bodyTxtTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 25,
    color: COLORS.baseOrange,
  },

  bodyTxtSub: {
    fontFamily: 'DMSans_400Regular_Italic'
  }
});