
import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

import dataDetails from '../data/dataDetails.json'
import transStyles from './styles'
import summStyles from './styles'

const Stack = createNativeStackNavigator()

const Transaction =() => {
    
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#2196F3' },
            headerTintColor: '#FFF',
            headerTitleStyle: { fontWeight: 'bold' }
        }}>
            <Stack.Screen name="Transactions List" component={TransLists} />
            <Stack.Screen name="Transactions Details" component={TransDetails} />
        </Stack.Navigator>
    )
}


function TransLists() {
    // return <TransactLists />

    const navigation = useNavigation()

    // Extracting unique store names
    const storeNames = Object.values(dataDetails.transaction).reduce((acc, cur) => {
        if (!acc.includes(cur.storeName)) {
            acc.push(cur.storeName)
        }
        return acc
    }, [])

    // Function to navigate to TransactDetails
    const handlePress = (storeName) => {
        navigation.navigate('Transactions Details', { storeName: storeName })
        // navigation.navigate(TransDetails( storeName ) )
    }

    // Render item for FlatList
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={transStyles.item}>
                <Text>{item}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={transStyles.container}>
            <FlatList
                data={storeNames}
                renderItem={renderItem}
                keyExtractor={(item) => item}
            />
        </View>
    )
}

function TransDetails({ route }) {
    const { storeName } = route.params;

    // Find the transaction details for the provided storeName
    const transactionDetails = dataDetails.transaction;
    const selectedTransaction = Object.values(transactionDetails).find(
        transaction => transaction.storeName === storeName
    );

    // If the transaction is found, display the details
    if (selectedTransaction) {
        const { productName, productPrice, storeAddress, transactDate } = selectedTransaction;
        return (
            <View style={summStyles.container}>
                {/* <Text>Product Name: {productName}</Text> */}
                <Text style={summStyles.container}> {productPrice}</Text>
                {/* <Text>Store Address: {storeAddress}</Text> */}
                {/* <Text>Transaction Date: {transactDate}</Text> */}
            </View>
        );
    } else {
        // If transaction details are not found for the provided storeName
        return (
            <View style={summStyles.prodPrice}>
                <Text>No transaction details found for {storeName}</Text>
            </View>
        );
    }
}




export default Transaction
