import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Posts from "../screens/Posts";
import CreatePost from "../screens/CreatePost";

const BottomTab = createBottomTabNavigator();

 const BottomTabNavigator = ()=> {
  return (
    
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Posts') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Criar') {
              iconName = focused ? 'ellipsis-horizontal-circle' : 'ellipsis-horizontal-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}        
      >
        <BottomTab.Screen name="Posts" component={Posts} />
        <BottomTab.Screen name="Criar" component={CreatePost} />
      </BottomTab.Navigator>
    
  );
}

export default BottomTabNavigator 