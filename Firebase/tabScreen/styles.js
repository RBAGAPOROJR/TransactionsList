
import { StyleSheet } from 'react-native'

const transStyles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#5593DA'
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5593DA'
    },
    container2: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10
    },
    item: {
        flexDirection : 'row',
        justifyContent:'space-between',    
        padding: 10,
        fontSize: 18,
        height: 50,
    },

    // TRANSACTION DETAILS STYLE * * * * * * * * * * * * * * * * * *
    prodPrice: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff'
    },
    textDetails: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    transacDate: {
        fontSize: 20,
        color: '#B2B2B2'
    },

    // SUMMARY DETAILS STYLE * * * * * * * * * * * * * * * * * *
    summaryFlex: {
        flex: 1,
        backgroundColor : '#fff',
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10
    },
    fontStyle: {
        fontSize: 20,
        color: '#B2B2B2',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#5593DA',
        paddingLeft: 5,
        paddingTop: 5
    }


})


export default transStyles