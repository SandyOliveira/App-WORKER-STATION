import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";

import CreatePost from "../screens/CreatePost"

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Guia"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Guia" component={BottomTabNavigator} />
      <Stack.Screen name="Create" component={CreatePost} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
