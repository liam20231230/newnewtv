import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity, useColorScheme } from "react-native";
import { BLACK_COLOR, WHITE_COLOR, GRAY_COLOR } from "../colors";
const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Go to search</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();
const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        headerTintColor: isDark ? WHITE_COLOR : BLACK_COLOR,
      }}
    >
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
};
export default Stack;
