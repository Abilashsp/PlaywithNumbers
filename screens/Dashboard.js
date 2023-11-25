import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';


export default function Dashboard({ route, navigation }) {
  const { StoreQuestion,showdashboard,attemptsInfo } = route.params;
  const [data, setdata] = useState([]);

  const db = SQLite.openDatabase("dashboard.db");
  useEffect(() => {
    db.transaction((t) => {
        db.transaction((t) => {
            t.executeSql(
                "CREATE TABLE IF NOT EXISTS DashboardTable (id INTEGER PRIMARY KEY AUTOINCREMENT, GenerateQuestions TEXT, FirstAttempts TEXT,SecondAttempts TEXT,ThirdAttempts TEXT);",
                [],
              );
          });
        }
    )
    db.transaction((t) => {
        StoreQuestion.forEach((d,index) => {
          let question = `${d.num1}*${d.num2}`;
          let attempts = attemptsInfo[index+1];
          console.log(attempts)
          t.executeSql(
            "INSERT INTO DashboardTable (GenerateQuestions, FirstAttempts,SecondAttempts,ThirdAttempts) VALUES (?, ?,?,?);",
            [question, attempts.firstAttempt,attempts.secondAttempt,attempts.thirdAttempt],
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
        });
      });
      db.transaction((t) => {
        t.executeSql("SELECT * FROM DashboardTable", null, (_, { rows }) => {
          const data = rows._array;
          setdata(data);
          console.log("data",data);
        });
      });

  
  }, []);
  

  return (
    <View className="flex-col items-center justify-center ">
      {data.map((e, index) => (
        <Text key={index}>{e.GenerateQuestions}</Text>
      ))}
    </View>
  );
}
