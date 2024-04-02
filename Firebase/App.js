
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
            if (route.name === 'Transaction') {
              iconName = focused ? 'file' : 'file-o'
            } else if (route.name === 'Summary') {
              iconName = focused ? 'info-circle' : 'info'
            }
            return <Icon name={iconName} size={size} color={color} />
          },
          
        })}
      >
        <Tab.Screen name='Transaction' component={Transaction}  options={{ headerShown: false }} />
        <Tab.Screen name='Summary' component={Summary} 
          options={{
            headerStyle: { backgroundColor: "#2196F3", },
            headerTitleStyle : { color: '#FFF', fontSize: 24  },
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
