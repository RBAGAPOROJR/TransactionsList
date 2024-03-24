
import React from 'react'
import dataDetails from '../data/dataDetails.json'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TransactDetails from './TransactDetails'


const TransactLists = () => {

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
        // navigation.navigate('TransDetails', { storeName: storeName })
        navigation.navigate( TransactDetails({storeName}))
    }

    // Render item for FlatList
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.item}>
                <Text>{item}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={storeNames}
                renderItem={renderItem}
                keyExtractor={(item) => item}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

export default TransactLists