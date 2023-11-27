import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ShowResult from './ShowResult';


const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

const generateOptions = (answer) => {
  const optionsSet = new Set();
  optionsSet.add(answer);

  while (optionsSet.size < 3) {
    const option = Math.abs(getRandomNumber(answer - 10, answer + 10));
    optionsSet.add(option);
  }

  const shuffledOptions = shuffleArray(Array.from(optionsSet));
  return shuffledOptions;
};

const generateQuestion = (count, total) => {
  const uniqueQuestions = new Set();
  let question;

  do {
    question = generateSingleQuestion(count, total);
  } while (uniqueQuestions.has(JSON.stringify(question)));

  uniqueQuestions.add(JSON.stringify(question));

  return question;
};

const generateSingleQuestion = (count, total) => {
  let num1, num2;

  do {
    num1 = getRandomNumber(1, count);
    num2 = getRandomNumber(0, total);
  } while (num1 === num2);

  const answer = num1 * num2;
  const options = generateOptions(answer);
  const shuffledOptions = shuffleArray(options);

  return { num1, num2, answer, options: shuffledOptions };
};


const Buttons = ({ count, totalbuttonvalues,setstorequestionhere, navigation }) => {
  const totalNoquestions = count * totalbuttonvalues;
  const [question, setQuestion] = useState(generateQuestion(count, totalbuttonvalues));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timesUp, setTimesUp] = useState(false);
  const [redFlag, setRedFlag] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [questionCount, setQuestionCount] = useState(totalNoquestions);
  const [storeCorrectAnswer, setStoreCorrectAnswer] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const[StoreQuestion,setStoreQuestion]=useState([])
  
  const [attemptsInfo, setAttemptsInfo] = useState([
    { firstAttempt: false, secondAttempt: false, thirdAttempt: false },
  ]);







  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [questionCount]);

  useEffect(() => {
    if (timeRemaining < 10) {
      setRedFlag(true);
    }
    if (timeRemaining === 0) {
      setTimesUp(true);
      if (questionCount > 1) {
        setQuestion(generateQuestion(count, totalbuttonvalues));
        setSelectedAnswer(null);
        setIsCorrect(null);
        setTimeRemaining(10);
      }
    }
  }, [timeRemaining]);

  const handleOptionPress = (selectedOption) => {
    const isAnswerCorrect = selectedOption === question.answer;
    setstorequestionhere(StoreQuestion)
    if (isAnswerCorrect) {
      setSelectedAnswer(selectedOption);
      setIsCorrect(true);
      setStoreCorrectAnswer(prev=>prev+1)

      setTimeout(() => {
        setStoreQuestion((prevQuestions) => [...prevQuestions, question]);
        if(attempts==0) setAttemptsInfo((prevAttemptsInfo) => [
          ...prevAttemptsInfo,
          { firstAttempt: true, secondAttempt: false, thirdAttempt: false },
        ]);
        if(attempts==1) setAttemptsInfo((prevAttemptsInfo) => [
          ...prevAttemptsInfo,
          { firstAttempt: false, secondAttempt: true, thirdAttempt: false },
        ]);
        if(attempts==2) setAttemptsInfo((prevAttemptsInfo) => [
          ...prevAttemptsInfo,
          { firstAttempt: false, secondAttempt: false, thirdAttempt: true },
        ]);
        if (questionCount > 1) {
          setQuestion(generateQuestion(count, totalbuttonvalues));
          setQuestionCount((prev) => prev - 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setAttempts(0);
        } else {
          setTimesUp(true);
        }
      }, 1000);
    } else {
      setSelectedAnswer(selectedOption);
      setAttempts((prevAttempts) => prevAttempts + 1);

      setTimeout(() => {
        setQuestion((prevQuestion) => {
          const newOptions = shuffleArray(generateOptions(prevQuestion.answer));
          return { ...prevQuestion, options: newOptions };
        });
        setSelectedAnswer(null);
        setIsCorrect(null);
      }, 1000);


      if (attempts >= 2) {
        setAttemptsInfo((prevAttemptsInfo) => [
          ...prevAttemptsInfo,
          { firstAttempt: false, secondAttempt: false, thirdAttempt:false },
        ])
        setTimeout(() => {
          if(attempts==0) setAttemptsInfo((prevAttemptsInfo) => [
            ...prevAttemptsInfo,
            { firstAttempt: true, secondAttempt: false, thirdAttempt: false },
          ]);
          if(attempts==1) setAttemptsInfo((prevAttemptsInfo) => [
            ...prevAttemptsInfo,
            { firstAttempt: false, secondAttempt: true, thirdAttempt: false },
          ]);
          if(attempts==2) setAttemptsInfo((prevAttemptsInfo) => [
            ...prevAttemptsInfo,
            { firstAttempt: false, secondAttempt: false, thirdAttempt: true },
          ]);
          setStoreQuestion((prevQuestions) => [...prevQuestions, question]);
          if (questionCount > 1) {
            setQuestion(generateQuestion(count, totalbuttonvalues));
            setQuestionCount((prev) => prev - 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setAttempts(0);
          } else {
            setTimesUp(true);
          }
        }, 1000);
      }
    }
  };
  const getRemainingTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}m:${seconds < 10 ? '0' : ''}${seconds}`;
  };
 

  return (
    <View className="w-full h-full bg-white">
      {!timesUp ? (
        <>
          <View className="flex-row justify-around">
            <View className="mt-10 items-start">
              <Text className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30">{`Questions Remaining: ${questionCount}`}</Text>
            </View>
            <View className="mt-10 items-end">
              <Text className={`inline-flex items-center rounded-md px-2 py-1 text-lg font-medium ${redFlag ? 'text-red-400 bg-red-500/10' : 'text-green-400 bg-green-500/10'} ring-1 ring-inset ring-green-500/20 `}>{`Time Remaining: ${getRemainingTime()}s`}</Text>
            </View>
          </View>

          <View className="flex flex-1 items-center justify-center py-12 sm:px-6 lg:px-8 ">
            <Text className="text-xl px-3 py-2 mr-48 font-semibold leading-6 text-gray-900">Question:</Text>
            <View className="border border-b border-gray-200 bg-white px-10 py-10 sm:px-6 rounded-lg">
              <Text className=" text-9xl ">{`${question.num1} x ${question.num2} `}</Text>
              <View>
                <View className=" mt-8 flex-row justify-stretch">
                  {question.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleOptionPress(option)}
                      disabled={selectedAnswer !== null}
                    >
                      <Text className={`m-1 rounded-full border ${isCorrect && selectedAnswer === option ? 'bg-green-500' : ''} ${!isCorrect && selectedAnswer === option ? 'bg-red-500' : ''} p-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View className="flex-col items-center justify-center ">
          <Text className=" items-center mt-64 text-2xl">Good Work!</Text>
          <Text className="inline-flex  w-20 items-center rounded-md bg-blue-400/10 px-2 py-1 text-xl font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30" onPress={() => navigation.navigate('ShowResult', { paramKey: totalNoquestions, Correctanswer: storeCorrectAnswer ,StoreQuestion:StoreQuestion,attemptsInfo:attemptsInfo})}>Show Result</Text>
        </View>
      )}
    </View>
  );
};

export default Buttons;
