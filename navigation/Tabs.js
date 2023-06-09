import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { View } from "react-native-web";
import { BLACK_COLOR, WHITE_COLOR, GRAY_COLOR } from "../colors";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Fontisto,
} from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() == "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        tabBarActiveTintColor: isDark ? WHITE_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: GRAY_COLOR,
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: "600",
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        headerTintColor: isDark ? WHITE_COLOR : BLACK_COLOR,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? "movie" : "movie-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "tv" : "tv-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
