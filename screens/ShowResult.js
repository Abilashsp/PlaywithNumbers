import { TouchableOpacity, Button, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import {createTable,fetchData,insertData} from "./Database"



export default function ShowResult({ route, navigation }) {
  const { paramKey, Correctanswer, StoreQuestion, attemptsInfo } = route.params;
  const [showdashboard, setshowdashboard] = useState(true);
  const [data, setdata] = useState([]);

 

 

  useEffect(() => {
    initDatabase();
  })

  
  const initDatabase = async () => {
    await createTable();
    fetchDataAndUpdateState();
  };

  const fetchDataAndUpdateState = async () => {
    const result = await fetchData();
    setdata(result);
  };

  const dashboardclick = async () => {
    const insertdata = StoreQuestion.map((d, index) => `${d.num1}*${d.num2}`);
    console.log("insertdata", insertdata);
    console.log("jsondata", JSON.stringify(insertdata));
  
    for (const data of insertdata) {
      const insertId = await insertData(data);
      console.log('insertid:', insertId);
    }
  
    fetchDataAndUpdateState();
  
    route.params.StoreQuestion = [];
    route.params.attemptsInfo = [];
  };



  return (
    <View className="h-full w-full ">
      <View className=" flex-row justify-center items-center h-3/5 border border-gray-200 bg-white px-10 py-10 sm:px-6 mt-5 mx-auto rounded-xl">
        <View className=" border border-gray-200 bg-white px-10 py-10 sm:px-6">
          <Text className="text-3xl">Your Score is : {Correctanswer}/{paramKey}</Text>
        </View>
      </View>
      <View className=" flex-row justify-center items-center mt-6">
        <View className=" border-b border-gray-200 bg-white px-4 py-5 sm:px-6 rounded-xl bg-blue-500">
          <Text className="text-4xl text-white" onPress={() => { navigation.navigate('Dashboard', { data: data}), dashboardclick() }}>View Dashboard</Text>
        </View>
      </View>
    </View>
  );
}

