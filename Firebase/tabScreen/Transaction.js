
import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import dataDetails from '../data/dataDetails.json'
import transStyles from './styles'


const Stack = createNativeStackNavigator()

const Transaction = () => {

  return (

    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#2196F3' },
      headerTintColor: '#FFF',
      headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
    }}>
      <Stack.Screen name="Transactions Lists" component={TransLists} />
      <Stack.Screen name="Transactions Details" component={TransDetails} />
    </Stack.Navigator>

  )
}


function TransLists() {
  const navigation = useNavigation();

  const storeDetails = Object.values(dataDetails.transaction).reduce((acc, cur) => {
    // Check if storeName already exists in acc array
    const existingStore = acc.find(item => item.storeName === cur.storeName);
    if (!existingStore) {
      // If storeName doesn't exist, add it to acc array with productPrice
      acc.push({ storeName: cur.storeName, productPrice: cur.productPrice });
    }
    return acc;
  }, []);

  const handlePress = (storeName) => {
    navigation.navigate('Transactions Details', { storeName: storeName });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.storeName)}>
      <View style={transStyles.item}>
        <Text style={{ fontWeight:'500', fontSize:18}}>{item.storeName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{color:'gray'}}>{item.productPrice}</Text>
          <Ionicons name="chevron-forward-outline" size={16} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={transStyles.container}>
      <FlatList
        data={storeDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.storeName}
      />
    </View>
  );
}


function TransDetails({ route }) {

  const { storeName } = route.params

  const transactionDetails = dataDetails.transaction
  const selectedTransaction = Object.values(transactionDetails).find(

    transaction => transaction.storeName === storeName

  )

  if (selectedTransaction) {

    const { productPrice, storeAddress, transactDate } = selectedTransaction

    return (
      <>
        <View style={transStyles.container1}>
          <Text style={transStyles.prodPrice}> {productPrice}</Text>
          <Text style={transStyles.textDetails}>{storeName}</Text>
          <Text style={transStyles.textDetails}>{storeAddress}</Text>
        </View>
        <View style={transStyles.container2}>
          <Text style={{ fontSize: 20 }}>Transaction Date</Text>
          <Text style={transStyles.transacDate}>{transactDate}</Text>
        </View>
      </>
    )

  } else {

    return (
      <View style={transStyles.prodPrice}>
        <Text>No transaction details found for {storeName}</Text>
      </View>
    )

  }
}

export default Transaction
