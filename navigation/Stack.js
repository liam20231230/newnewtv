import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity, useColorScheme } from "react-native";
import { BLACK_COLOR, WHITE_COLOR, GRAY_COLOR } from "../colors";
import Detail from "../screens/Detail";

const NativeStack = createNativeStackNavigator();
const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: "fade_from_bottom",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerBackTitleVisible: true,

        headerTintColor: isDark ? WHITE_COLOR : BLACK_COLOR,
        headerTitleStyle: {
          color: isDark ? WHITE_COLOR : BLACK_COLOR,
        },
      }}
    >
      <NativeStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerStyle: {
            backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
          },
        }}
      />
    </NativeStack.Navigator>
  );
};
export default Stack;
