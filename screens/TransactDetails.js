
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TransactDetails = ({ route }) => {
    // const { storeName } = route.params
    

    return (
        // <View style={styles.container}>
        //     <Text>Store Name: {storeName}</Text>
        //     {/* Display more details based on the selected store name */}
        // </View>

        console.log(route)
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default TransactDetails
