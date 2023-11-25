import { View, Text, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function ShowResult({ route ,navigation}) {
    const { paramKey, Correctanswer,StoreQuestion } = route.params;
    const[showdashboard,setshowdashboard]=useState(true);
  return (
    <View className="h-full w-full ">
    <View className=" flex-row justify-center items-center h-3/5 border border-gray-200 bg-white px-10 py-10 sm:px-6 mt-5 mx-auto rounded-xl">
        <View className=" border border-gray-200 bg-white px-10 py-10 sm:px-6">
        <Text className="text-3xl">Your Score is : {Correctanswer}/{paramKey}</Text>
        </View>
    </View>
    <View className=" flex-row justify-center items-center mt-6">
        <View className=" border-b border-gray-200 bg-white px-4 py-5 sm:px-6 rounded-xl bg-blue-500">
        <Text className="text-4xl text-white" onPress={ ()=>{navigation.navigate('Dashboard', {StoreQuestion:StoreQuestion,showdashboard:showdashboard})}}>View Dashboard</Text>
        </View>
    </View>
    </View>
  );
}

