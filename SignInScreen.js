import { useState } from 'react';
import { TextInput, Button, StyleSheet, View, Alert } from 'react-native';


const SignInScreen = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSignInClicked = () => {
        if(username != 'admin' || password != 'admin') {
            Alert.alert('Please try again!', 'Incorrect Username or Password.');
        } else {
            Alert.alert('Login Successful', 'Welcome '+username);
            navigation.navigate('Home', {username: username});
        }
    }

    const onSignUpClicked = () => {
        navigation.navigate('SignUp');
    }

    return(
        <View style = {styles.container}>
            <TextInput
                style={styles.inputStyle}
                placeholder='Enter Username'
                textContentType='name'
                returnKeyType='next'
                autoCapitalize='none'
                value={username}
                onChangeText={setUsername} />

            <TextInput 
                style={styles.inputStyle}
                placeholder='Enter Password'
                textContentType='password'
                returnKeyType='done'
                autoCapitalize='none'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} />

            <Button title='SignIn' onPress={onSignInClicked} />
            <Button title='SignUp' onPress={onSignUpClicked} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 24,
    },
    inputStyle: {
        height: 50,
        margin: 8,
        borderColor: '#2196F3',
        borderWidth: 1,
        padding: 5,
    }
});

export default SignInScreen;