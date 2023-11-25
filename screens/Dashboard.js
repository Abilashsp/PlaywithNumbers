import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';


export default function Dashboard({ route, navigation,...props }) {

    const{storequestionhere}=props
  const { StoreQuestion,showdashboard } = route.params;
  const [data, setdata] = useState([]);

  const db = SQLite.openDatabase("dashboard.db");
  if (showdashboard) {
    db.transaction((t) => {
      StoreQuestion.forEach((d) => {
        let question = `${d.num1}*${d.num2}`;
        t.executeSql(
          "INSERT INTO DashboardTable (GenerateQuestions) VALUES (?);",
          [question],
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
    route.params.StoreQuestion = [];
    route.params.showdashboard = false;
  }

  useEffect(() => {
    db.transaction((t) => {
        db.transaction((t) => {
            t.executeSql(
              "CREATE TABLE IF NOT EXISTS DashboardTable (id INTEGER PRIMARY KEY AUTOINCREMENT, GenerateQuestions TEXT);",
              []
            );
          });
        }
    )

    db.transaction((t) => {
        t.executeSql("SELECT * FROM DashboardTable", null, (_, { rows }) => {
          const data = rows._array;
          setdata(data);
        //   console.log("data",data);
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
