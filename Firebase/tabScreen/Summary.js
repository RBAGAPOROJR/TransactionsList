
import React from 'react'
import { Text, View } from 'react-native'
import { Divider } from '@rneui/themed'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import dataDetails from '../data/dataDetails.json'
import transStyles from './styles'

// Import Firebase / Firestore
import { dbFS } from '../data/firebase/firebaseConfig'
import { collection, onSnapshot } from 'firebase/firestore'

const Stack = createNativeStackNavigator()

const Summary = () => {
  return (

    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#2196F3' },
      headerTintColor: '#FFF',
      headerTitleStyle: { fontWeight: 'bold' },
      headerShown: false
    }}>
      <Stack.Screen name=" " component={Summaries} />
    </Stack.Navigator>

  )
}

function Summaries() {

  const [data, setData] = React.useState([])
  React.useEffect(() => {

    const dbCollection = collection(dbFS, 'finance-transac')
    const unsubscribe = onSnapshot(dbCollection, (snapshot) => {

      const newData = []
      snapshot.forEach((doc) => {

        newData.push({

          id: doc.id,
          ...doc.data(),

        })

      })
      console.log('DATA : ', newData)

      setData(newData)

    })

    return () => {

      unsubscribe()

    }

  }, [])

  // Calculate the count of transactions
  const transactionCount = data.length

  // Calculate total product price
  const totalProdPrice = data.reduce((total, data) => {
    return total + data.productPrice
  }, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })


  // Find the most expensive and cheapest products
  let mostExpensive = { productName: "", productPrice: 0 }
  let cheapest = { productName: "", productPrice: Number.MAX_SAFE_INTEGER }

  Object.values(data).forEach((transaction) => {

    const price = parseFloat(transaction.productPrice)

    if (price > mostExpensive.productPrice) {
      mostExpensive = { productName: transaction.productName, productPrice: price }
    }

    if (price < cheapest.productPrice) {
      cheapest = { productName: transaction.productName, productPrice: price }
    }
  })

  const mostExpensiveFormatted = `$${mostExpensive.productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const cheapestFormatted = `$${cheapest.productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`


  return (
    <>
      <View style={transStyles.summaryFlex}>
        <View style={transStyles.spaceBetween}>
          <Text style={{ fontSize: 20 }}>Transactions</Text>
          <Text style={transStyles.fontStyle}>{transactionCount}</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Divider width={2} />
        </View>
        <View style={transStyles.spaceBetween}>
          <Text style={{ fontSize: 20 }}>Balance</Text>
          <Text style={transStyles.fontStyle}>${totalProdPrice}</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Divider width={2} />
        </View>
        <View style={transStyles.header}>
          <Text style={transStyles.header}>High Spending</Text>
          <View style={transStyles.spaceBetween}>
            <Text style={{ fontSize: 20 }}>{mostExpensive.productName}</Text>
            <Text style={transStyles.fontStyle}>{mostExpensiveFormatted}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Divider width={2} />
        </View>
        <View style={transStyles.header}>
          <Text style={transStyles.header}>Low Spending</Text>
          <View style={transStyles.spaceBetween}>
            <Text style={{ fontSize: 20 }}>{cheapest.productName}</Text>
            <Text style={transStyles.fontStyle}>{cheapestFormatted}</Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default Summary
