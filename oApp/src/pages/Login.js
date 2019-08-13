import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAvoidingView, Platform, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api'

import logo from '../assets/logo.png';


export default function Login({ navigation }) {
    const [user, setUser] = useState('');

    useEffect(() => { 
        AsyncStorage.getItem('user').then(user =>{
            if(user)
            navigation.navigate('Main',{user})
        })
    },[]); // Deixando esse array vazio o AsyncStorage só será executado uma vez e não sempre que o estado for alterado

    async function handleLogin() {
        const response = await api.post('/devs', { username: user });

        const { _id } = response.data.userExists === undefined ? response.data : response.data.userExists;
        // Tive que fazer uma verificação extra nessa linha, não sei ao certo o motivo de não funcionar igual ao original


        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', {user: _id});
    }

    return (
        <KeyboardAvoidingView  /* Esse componente vai evitar que o teclado do aparelho seja exibido em cima dos outros componentes no IOS, no android não é preciso*/
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}>

            <Image source={logo} />

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário do GitHub"
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 30,
    },

    input: {
        height: 46,
        alignSelf: 'stretch', /* Para ocupar toda largura possível */
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});