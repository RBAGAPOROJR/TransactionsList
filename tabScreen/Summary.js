import React from 'react';
import { Text, View, StyleSheet, Separator } from 'react-native';

import { Divider, useTheme } from '@rneui/themed';

import dataDetails from '../data/dataDetails.json';
import transStyles from './styles'; // Assuming you have defined styles in './styles'



const Summary = () => {

    // Calculate the count of transactions
    const transactionCount = Object.keys(dataDetails.transaction).length;

    // Calculate total product price
    const totalProdPrice = Object.values(dataDetails.transaction).reduce((total, transaction) => {
        // Extract product price from each transaction and convert it to a float
        const price = parseFloat(transaction.productPrice.replace(/[^0-9.-]+/g, ""));
        return total + price;
    }, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Use toLocaleString to add commas and format the number

    // Find the most expensive and cheapest products
    let mostExpensive = { productName: "", productPrice: 0 };
    let cheapest = { productName: "", productPrice: Number.MAX_SAFE_INTEGER };

    Object.values(dataDetails.transaction).forEach(transaction => {
        // const price = parseFloat(transaction.productPrice.replace(/[^0-9.-]+/g, ""));
        const price = parseFloat(transaction.productPrice.replace(/[^0-9.-]+/g, "").replace(/,/g, ""));


        if (price > mostExpensive.productPrice) {
            mostExpensive = { productName: transaction.productName, productPrice: price };
        }

        if (price < cheapest.productPrice) {
            cheapest = { productName: transaction.productName, productPrice: price };
        }
    });

    const mostExpensiveFormatted = `$${mostExpensive.productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const cheapestFormatted = `$${cheapest.productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;


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
    );
};

export default Summary;
