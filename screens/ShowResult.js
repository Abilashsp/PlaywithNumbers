import { TouchableOpacity, Button ,View,Text} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';


export default function ShowResult({ route ,navigation}) {
    const { paramKey, Correctanswer,StoreQuestion,attemptsInfo } = route.params;
    const[showdashboard,setshowdashboard]=useState(true);
    const [data, setdata] = useState([]);

    const db = SQLite.openDatabase("dashboard.db");
// console.log(StoreQuestion)
console.log("attemptinfo".attemptsInfo)

useEffect(()=>{
     db.transaction((t) => {
          db.transaction((t) => {
              t.executeSql(
                  "CREATE TABLE IF NOT EXISTS DashboardTable (id INTEGER PRIMARY KEY AUTOINCREMENT, GenerateQuestions TEXT, FirstAttempts TEXT,SecondAttempts TEXT,ThirdAttempts TEXT);",
                  [],
                );
            });
          }
      )
})

const dashboardclick = () => {
  db.transaction((t) => {
    StoreQuestion.forEach((d, index) => {
      let question = `${d.num1}*${d.num2}`;
      let attempts = attemptsInfo[index+1];
      if (attempts) {
        t.executeSql(
          "INSERT INTO DashboardTable (GenerateQuestions, FirstAttempts, SecondAttempts, ThirdAttempts) VALUES (?, ?, ?, ?);",
          [question, attempts.firstAttempt, attempts.secondAttempt, attempts.thirdAttempt],
          (_, insertResult) => {
            if (insertResult.rowsAffected > 0) {
              console.log(`Successfully inserted: ${question}`);
            } else {
              console.warn(`No rows inserted for: ${question}`);
            }
          },
          (_, insertError) => {
            console.error("Error inserting into DashboardTable:", insertError);
          }
        );
      } else {
        console.warn(`Attempts info is undefined for index ${index}`);
      }
    });
  });

  route.params.StoreQuestion = [];
  route.params.attemptsInfo = [];
};

const refreshlist=()=>{
  db.transaction((t) => {
          t.executeSql("select * from DashboardTable", null, (_, { rows }) => {
            const data = rows._array;
            setdata(data);
            // console.log("data",data);
            // console.log("db",rows)
          });
        });
}

// console.log(data)
  return (
    <View className="h-full w-full ">
    <View className=" flex-row justify-center items-center h-3/5 border border-gray-200 bg-white px-10 py-10 sm:px-6 mt-5 mx-auto rounded-xl">
        <View className=" border border-gray-200 bg-white px-10 py-10 sm:px-6">
        <Text className="text-3xl">Your Score is : {Correctanswer}/{paramKey}</Text>
        </View>
    </View>
    <View className=" flex-row justify-center items-center mt-6">
        <View className=" border-b border-gray-200 bg-white px-4 py-5 sm:px-6 rounded-xl bg-blue-500">
        <Text className="text-4xl text-white" onPress={ ()=>{navigation.navigate('Dashboard', {data:data,refreshlist:refreshlist,db:db}),dashboardclick(),refreshlist()}}>View Dashboard</Text>
        </View>
    </View>
    </View>
  );
}

