import React from 'react';
import { View, Text, Carousel, Button,Card, ColorName,PageControl } from 'react-native-ui-lib';
import { useState, useEffect } from 'react';

export default function PageDesign({...props}) {
  const{ count, totalbuttonvalues,setstorequestionhere, navigation }=props
  const [currentPage, setCurrentPage] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const totalNoquestions = count * totalbuttonvalues;
  console.log("total values",totalNoquestions)

  
 
   // Function to generate a random integer within a specified range
   function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to generate a unique random multiplication question
  function generateRandomQuestion(usedQuestions) {
    let num1 = getRandomInt(1, count);
    let num2 = getRandomInt(1, totalbuttonvalues);
    let answer = num1 * num2;

    // Check if the question is unique
    while (usedQuestions.includes(`${num1} * ${num2}`)) {
      num1 = getRandomInt(1, 10);
      num2 = getRandomInt(1, 10);
      answer = num1 * num2;
    }

    // Add the question to the used questions array
    usedQuestions.push(`${num1} * ${num2}`);

    // Generate two incorrect options
    let incorrect1 = answer + getRandomInt(1, 5);
    let incorrect2 = answer - getRandomInt(1, 5);

    // Ensure options are unique
    while (incorrect1 === answer || incorrect2 === answer || incorrect1 === incorrect2) {
      incorrect1 = answer + getRandomInt(1, 5);
      incorrect2 = answer - getRandomInt(1, 5);
    }

    // Shuffle the options randomly
    const options = [answer, incorrect1, incorrect2];
    options.sort(() => Math.random() - 0.5);

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

  

  const renderItem = (item, index) => (
    <View key={index} paddingH-16 className="py-9">
      <Card className=" mt-2 h-96 py-9  justify-center items-center ">
        <View>
            <Text className="text-6xl">{item.question}</Text>
        </View>
        <View className="flex-row mt-14 ">
        <Button label={item.options[0]}   className="mx-1 bg-white border" color={'black'} />
        <Button label={item.options[1]} className="mx-1 bg-white border"  color={'black'} />
        <Button label={item.options[2]} className="mx-1 bg-white border" color={'black'}  />
        </View>
        
      </Card>
    </View>
  );

  return (
    <View flex padding-page className="h-full">
        <View className="mt-5 mr-2 items-end">
      <Text heading marginB-s4 className="bg-green-300 rounded-md px-2 py-1 text-lg font-medium ring-1 ring-inset ring-green-500/20">
        Time :<Text className="inline-flex items-center rounded-md bg-green-600/10 px-2 py-1 text-base font-medium text-white ring-1 ring-inset ring-green-500/30"> 2m:3s</Text>
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
