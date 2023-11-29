import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

export default function InputTable({navigation,...props}) {
    const{buttonDecrease,
        buttons,
        buttonIncrease,
        count,
        decrease,
        increase}=props
  return (
    <View className="w-full items-center mx-auto  block p-6 bg-white  border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
    <View className=" h-4/6 border-0 px-2 py-4 rounded-lg bg-slate-200">
      <Text className="bg-green-100 text-green-800 text-xs font-medium mb-3 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">No of Table</Text>
      <View className="flex-row mb-2">
        <TouchableOpacity
          className="rounded-md  w-10 h-12 bg-red-400 p-4 mx-2 text-white shadow-sm hover:bg-indigo-500"
          onPress={buttonDecrease}
        >
          <Text className="text-white">-</Text>
        </TouchableOpacity>
        <View className=" w-56 py-2 border rounded-lg bg-slate-300 ">
          <View className="flex-row flex-wrap">{buttons}</View>
        </View>
        <TouchableOpacity
          className="rounded-md w-10 h-12 bg-green-400 p-4 mx-2 text-white shadow-sm hover:bg-indigo-500"
          onPress={buttonIncrease}
        >
          <Text className="text-white">+</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View className="flex-row  items-center px-5 h-40 border block max-w-sm p-6 bg-white  border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
      <Text className=" px-4 text-2xl bg-gray-100 text-gray-800  font-medium mb-1 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">ROWS :</Text>
      <TouchableOpacity className="text-white bg-red-400  mx-2 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2  " onPress={decrease}>
        <Text className="text-black">-</Text>
      </TouchableOpacity>

      <View className="bg-gray-200  px-10 rounded-md py-6">
        <Text className="text-2xl">{count}</Text>
      </View>

      <TouchableOpacity className="text-white bg-green-200 mx-2 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onPress={increase}>
        <Text className="text-black">+</Text>
      </TouchableOpacity>
    </View>
    <View className="mt-10">
      <Text className="text-white  bg-green-500 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"onPress={()=>navigation.navigate('Quiz')} >Start</Text>
    </View>
  </View>
  );
}

