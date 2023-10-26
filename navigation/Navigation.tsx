import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Add, Delete, Edit} from 'screens';
import TabBar from './TabBar';

const Tab = createMaterialTopTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{swipeEnabled: false}}
      tabBar={TabBar}>
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Edit" component={Edit} />
      <Tab.Screen name="Delete" component={Delete} />
    </Tab.Navigator>
  );
}
