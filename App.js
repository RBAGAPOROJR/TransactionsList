
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import Transaction from './tabScreen/Transaction'
import Summary from './tabScreen/Summary'

const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#2196F3",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            display: "flex"
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === 'Transactions') {
              iconName = focused ? 'file' : 'file-o'
            } else if (route.name === 'Summary') {
              iconName = focused ? 'heart' : 'heart-o'
            }
            return <Icon name={iconName} size={size} color={color} />
          },
        })}
      >
        <Tab.Screen name='Transactions' component={Transaction} />
        <Tab.Screen name='Summary' component={Summary} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
