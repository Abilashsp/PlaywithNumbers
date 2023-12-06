import React from 'react';
import { View, Text, Carousel, Button,Card, ColorName,PageControl ,LoaderScreen} from 'react-native-ui-lib';
import { useState, useEffect } from 'react';

export default function PageDesign({...props}) {
  const{ count, totalbuttonvalues,setstorequestionhere, navigation }=props
  const [currentPage, setCurrentPage] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(20)
  const[timesup,settimesup]=useState(false);
  const totalNoquestions = count * totalbuttonvalues;
 const[selectedvalue,setselectedvalue]=useState(null)



  // useEffect(() => {
  //   let timer;
  //   if (timeRemaining > 0) {
  //     timer = setInterval(() => {
  //       setTimeRemaining((prev) => prev - 1);
  //     }, 1000);
  //   } else {
  //     settimesup(true)
  //   }
  //   return () => clearInterval(timer);
  // }, [timeRemaining]);



  const getRemainingTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}m:${seconds < 10 ? '0' : ''}${seconds}`;
  };
 
const handlegetselectedvalue=(value)=>{
  setselectedvalue(value)
}





  
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateRandomQuestion(usedQuestions) {
    let num1, num2, answer;
  
    // Generate a unique question
    do {
      num1 = randomNumber(1, count);
      num2 = randomNumber(1, totalbuttonvalues);
      answer = num1 * num2;
    } while (usedQuestions.includes(`${num1} * ${num2}`));
  
    usedQuestions.push(`${num1} * ${num2}`);
  
    // Generate a pool of potential options
    const potentialOptions = [answer];
    for (let i = 0; i < 2; i++) {
      let potentialOption;
      do {
        potentialOption = answer + randomNumber(1, 5);
      } while (potentialOptions.includes(potentialOption) || potentialOption <= 0);
      potentialOptions.push(potentialOption);
    }
  
    // Shuffle the options randomly
    const options = potentialOptions.sort(() => Math.random() - 0.5);
  
    return {
      question: `${num1} * ${num2}`,
      options: options,
      correctAnswer: answer,
    };
  }

  function generateRandomQuestions(count, totalbuttonvalues) {
    const questions = [];
    const usedQuestions = [];
  
    while (questions.length < count * totalbuttonvalues) {
      const newQuestion = generateRandomQuestion(usedQuestions);
      questions.push(newQuestion);
    }
  
    return questions;
  }
  

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalNoquestions);
  };

  useEffect(() => {
    const questions = generateRandomQuestions(count, totalbuttonvalues);
    setQuestionData(questions);
  }, [count, totalbuttonvalues]);
   console.log(questionData)

  console.log("selectedvalue",selectedvalue)
  const renderItem = (item, index) => (
    <View key={index} paddingH-16 className="py-9">
      <Card className=" mt-2 h-96 py-9  justify-center items-center ">
        <View>
            <Text className="text-6xl">{item.question}</Text>
        </View>
        <View className="flex-row mt-14 ">
        <Button label={item.options[0]}   className="mx-1 bg-white border" color={'black'} onPress={()=>handlegetselectedvalue(item.options[0])} />
        <Button label={item.options[1]} className="mx-1 bg-white border"  color={'black'} onPress={()=>handlegetselectedvalue(item.options[1])}/>
        <Button label={item.options[2]} className="mx-1 bg-white border" color={'black'} onPress={()=>handlegetselectedvalue(item.options[2])} />
        </View>
        
      </Card>
    </View>
  );

  return (
    timesup ?(<View className=" w-full h-full flex-col justify-center items-center className bg-red-400">
    <Text className=" text-5xl">Game Over !</Text>
    {/* <Text className="text-white bg-gradient-to-r  bg-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2" >Restart</Text> */}
  </View>):
     <View flex padding-page className="h-full">
        <View className="mt-5 mr-2 items-end">
      <Text heading marginB-s4 className="bg-green-300 rounded-md px-2 py-1 text-lg font-medium ring-1 ring-inset ring-green-500/20">
        Time : <Text className={`inline-flex  items-center rounded-md bg-green-600/10 px-2 py-1 text-base font-medium text-white ring-1 ring-inset ${timeRemaining<10?"text-red-500":""} ring-green-500/30`}>{`${getRemainingTime()}s`} </Text>
      </Text>
      <Text heading marginB-s4 className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-base font-medium text-gray-500 ring-1 ring-inset ring-gray-400/20">
       Pages:1/3
      </Text>
      </View>
      <View className=" h-4/6 ">
      <Carousel
        onChangePage={() => {}} 
        currentPage={currentPage}
      >
        {questionData.map((item, index) => renderItem(item, index))}
      </Carousel>
      <PageControl
          numOfPages={8}
          currentPage={currentPage}
       />  

      <View className="items-center ">
      <Text className="font-bold text-lg underline">Skip Question</Text>
      </View>
      </View>


<View className="flex-row  justify-around  mt-10  ">
      <Button label="Prev" body bg-primaryColor square></Button>


      <View className="mt-2">
      <View className="flex-row " >
      <Text className="w-3 h-3 bg-green-500 rounded-full"></Text>
      <Text className="w-auto h-3 px-1 font-bold  text-green-400 rounded-full">10</Text>
      </View>
      <Text className="font-bold">Correct</Text>
      </View>


<View className="mt-2">
      <View className="flex-row">
      <Text className="w-3 h-3 bg-red-500 rounded-full"></Text>
      <Text className="w-auto h-3 px-1 font-bold text-red-400 rounded-full">12</Text>
      </View>
      <Text className="font-bold">Wrong</Text>
</View>

<View className="mt-2">
      <View className="flex-row">
      <Text className="w-3 h-3 bg-yellow-500 rounded-full"></Text>
      <Text className="w-auto h-3 px-1 font-bold text-yellow-400 rounded-full">10</Text>
      </View>
      <Text className="font-bold">Not Answer</Text>
      </View>


      <Button label="Next" body bg-primaryColor square onPress={()=>handleNext()} ></Button>
      </View>
      
    </View>
 
  );

  
}
