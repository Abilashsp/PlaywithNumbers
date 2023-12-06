import React from 'react';
import { View, Text, Button } from 'react-native';
import { Wizard } from 'react-native-ui-lib';

const DummyComponent = ({ title, onNextPressed }) => (
  <View className="h-screen w-full">
    <Text>{title}</Text>
    <Button title="Next" onPress={onNextPressed} />
  </View>
);

const YourComponent = () => {
  const wizardRef = React.useRef();

  const handleNext = () => {
    if (wizardRef.current && wizardRef.current.next) {
      wizardRef.current.next();
    }
  };

  const renderItem = (item, index) => {
    return <DummyComponent key={index} title={item.title} onNextPressed={handleNext} />;
  };

  const items = [
    { title: 'Step 1' },
    { title: 'Step 2' },
    { title: 'Step 3' },
  ];

  return (
    <Wizard ref={wizardRef} activeIndex={0} onActiveIndexChanged={() => console.log('changed')}>
      {items.map((item, index) => renderItem(item, index))}
    </Wizard>
  );
};

export default YourComponent;
