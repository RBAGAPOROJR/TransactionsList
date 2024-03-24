import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactScreen from './ContactScreen'
import FavoriteScreen from './FavoriteScreen'

const Tab = createBottomTabNavigator();

const HomeScreen = ({route}) => {
    const username = route.params.username;
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
                "tabBarActiveTintColor": "#2196F3",
                "tabBarInactiveTintColor": "gray",
                "tabBarStyle": [{
                    "display": "flex"
                }, null],
                "tabBarIcon": ({focused, color, size}) => {
                    let iconName;
                    if(route.name === 'Contact') {
                        iconName = focused ? 'file' : 'file-o';
                    } else if(route.name === 'Favorite') {
                        iconName = focused ? 'heart': 'heart-o';
                    }
                    return <Icon name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name='Contact' component={ContactScreen} />
            <Tab.Screen name='Favorite' component={FavoriteScreen} />
        </Tab.Navigator>
    )
}

export default HomeScreen;