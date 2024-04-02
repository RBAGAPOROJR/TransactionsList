
import React, { useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, Pressable, Modal } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import dataDetails from '../data/dataDetails.json'
import transStyles from './styles'
import modalStyles from './modalStyles'

// Import Firebase / Firestore
import { dbFS } from '../data/firebase/firebaseConfig'
import { collection, onSnapshot } from 'firebase/firestore'
import { newTodo } from '../data/firebase/random'

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
  const navigation = useNavigation()

  const [modalVisible, setModalVisible] = useState(false)

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
  
  const handlePress = (storeName) => {
    navigation.navigate('Transactions Details', { storeName: storeName })
  }

  // RENDER STORE NAME AND PRICE
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.storeName)}>
      <View style={transStyles.item}>
        <Text style={{ fontWeight: '500', fontSize: 18 }}>{item.storeName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'gray' }}>${item.productPrice}</Text>
          <Ionicons name="chevron-forward-outline" size={16} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
  )

  
  return (
    <View style={transStyles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.storeName}
      />
      <View style={transStyles.addButtonContainer}>
        <Pressable
          style={[modalStyles.button, modalStyles.buttonClose]}
          onPress={() => {
            console.log(newTodo())
          }}>
          <Text style={modalStyles.textStyle}>Add Expenses</Text>
        </Pressable>

      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        {/* Your modal content here */}
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Disclaimer :</Text>
            <Text style={modalStyles.modalText}>Adding new data is auto generated or based on stored json data.</Text>
            <Pressable style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)} >
              <Text style={modalStyles.textStyle}>Acknowledge</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

function TransDetails( { route } ) {

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
      
      setData(newData)

    })

    return () => {

      unsubscribe()

    }

  }, [])

  const { storeName } = route.params

  const transactionDetails = data
  
  const selectedTransaction = Object.values(transactionDetails).find(

    transaction => transaction.storeName === storeName

  )
  
  if ( selectedTransaction ) {

    const { productPrice, storeAddress, transactDate } = selectedTransaction

    return (
      <>
        <View style={transStyles.container1}>
          <Text style={transStyles.prodPrice}> ${productPrice}</Text>
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
