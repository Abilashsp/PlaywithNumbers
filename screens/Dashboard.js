import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';


const Dashboard = ({ route, navigation }) => {
  const { data } = route.params;

console.log("data",data)

  const tableHead = Object.keys(data?.[0] || {});

  return (
    data && (
      < ScrollView>
        <View style={{ flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' }}>
          <Table borderStyle={{ borderWidth: 2, borderColor: 'gray' }}>
            <Row
              data={tableHead.map((header) => header.replace(/([A-Z])/g, ' $1').trim())} // Convert camelCase to spaced words
              style={{ height: 40, backgroundColor: '#f1f8ff' }}
              textStyle={{ textAlign: 'center', fontWeight: 'bold' }}
            />
            <Rows
              data={data?.map((rowData) => Object.values(rowData)) || []}
              style={{ height: 80 }}
              textStyle={{ textAlign: 'center' }}
            />
          </Table>
        </View>
      </ScrollView>
    )
  );
};

export default Dashboard;
