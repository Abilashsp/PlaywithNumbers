import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const QuizComponent = () => {
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [questionData, setQuestionData] = useState(generateRandomQuestion(usedQuestions));

  // Function to generate a random integer within a specified range
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to generate a unique random multiplication question
  function generateRandomQuestion(usedQuestions) {
    let num1 = getRandomInt(1, 10);
    let num2 = getRandomInt(1, 10);
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

  const handleNextQuestion = () => {
    setQuestionData(generateRandomQuestion(usedQuestions));
  };
console.log(usedQuestions)
  return (
    <View>
      <Text>Question: {questionData.question}</Text>
      {questionData.options.map((option, index) => (
        <Button key={index} title={option.toString()} onPress={() => console.log('Selected option:', option)} />
      ))}
      <Button title="Next Question" onPress={handleNextQuestion} />
    </View>
  );
};

export default QuizComponent;
