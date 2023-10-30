import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigator from './StackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import Profile from '../screens/Profile';
import Configurations from "../screens/Configurations"
import ConfigureScreen from '../screens/Configurations';


const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      {/* <Drawer.Screen name = "home" component = {BottomTabNavigator}/>  */}
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Perfil" component={Profile} />
      <Drawer.Screen name="Configurações" component={ConfigureScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator