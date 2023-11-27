import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Buttons from "./screens/Buttons"
import InputTable from './screens/InputTable';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowResult from './screens/ShowResult';
import Dashboard from './screens/Dashboard';

const Stack = createNativeStackNavigator();

const App = () => {

  const [test, settest] = useState(false)
  const [buttonid, setbuttonid] = useState([])
  const [selectbuttonid,setselectbuttonid]=useState(null)
  const [totalbuttonvalues, settotalbuttonvalues] = useState(0);
  const [buttonlimit, setbuttonlimit] = useState(6)
  const [count, setCount] = useState(4);
  const[storequestionhere,setstorequestionhere]=useState([])
  const lowerLimit = 5;
  const upperLimit = 10;
  const buttonlowerlimit = 6;
  const buttonupperlimit = 20;


  useEffect(() => {
    settotalbuttonvalues(addedbuttons(buttonid));
  }, [buttonid]);

  const testcomponent = () => {
    settest(true)
  }

  const handlebuttonid = (id) => {
    setbuttonid(prev => (
      [...prev, id]
    ))
    setselectbuttonid(id)

  }
  const addedbuttons = (buttonid) => {
    let sum = 0;
    for (let i = 0; i < buttonid.length; i++) {
      sum = buttonid[buttonid.length - 1];
    }
    return sum;
  };




  console.log("total button  added", totalbuttonvalues)
  console.log("count", count)




  const buttonIncrease = () => {
    if (buttonlimit <= buttonupperlimit) {
      setbuttonlimit((prev) => prev + 1);
    }
  };

  const buttonDecrease = () => {
    if (buttonlimit >= buttonlowerlimit) {
      setbuttonlimit((prev) => prev - 1);
    }
  };


  const increase = () => {
    if (count < upperLimit) {
      setCount((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (count > lowerLimit) {
      setCount((prev) => prev - 1);
    }
  };
  const buttons = [];
  for (let i = 1; i < buttonlimit; i++) {
    buttons.push(
      <TouchableOpacity
        key={i}
        className={`text-white bg-sky-400 mx-2 ${selectbuttonid===i?"bg-blue-900":""}  from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2`}
        onPress={() => handlebuttonid(i)}
      >
        <Text>{i}</Text>
      </TouchableOpacity>
    );
  }
  console.log(storequestionhere)

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="InputTable">
          <Stack.Screen name="Home">{props =><InputTable {...props} 
            buttonDecrease={buttonDecrease}
            buttons={buttons}
            buttonIncrease={buttonIncrease}
            count={count}
            decrease={decrease}
            increase={increase} />}</Stack.Screen>
          <Stack.Screen name="Buttons">{props => <Buttons {...props} count={count} totalbuttonvalues={totalbuttonvalues} setstorequestionhere={setstorequestionhere} />}</Stack.Screen>
          <Stack.Screen name="ShowResult">{props => <ShowResult {...props}/>}</Stack.Screen>
          <Stack.Screen name="Dashboard">{props => <Dashboard {...props} storequestionhere={storequestionhere}/>}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};



export default App;
