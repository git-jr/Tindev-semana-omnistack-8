import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import AsyncStorage from '@react-native-community/async-storage'
import { View, SafeAreaView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import api from '../services/api';

import logo from '../assets/logo.png'
import like from '../assets/like.png'
import deslike from '../assets/deslike.png'
import itsamatch from '../assets/itsamatch.png'

export default function Main({ navigation }) {
    const id = navigation.getParam('user');

    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: id,
                }
            });
            setUsers(response.data);
        }
        loadUsers();
    }, [id]); // O que vai aconceter (loadUsers) e quando o que mudar (id)

    useEffect(() => {
        const seuIP = 'http://...';
        const socket = io(seuIP, {
            query: { user: id }
        });

        socket.on('macth', dev => { // Ouvindo do backend o evento o recebimento de "macth"
            setMatchDev(dev);
        })

    }, [id]);


    async function handleLike() {
        const [user, ...rest] = users; /* Isso coloca o primeiro usuário na variável "user" e o resto deles na "rest" */

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id },
        })

        setUsers(rest)
    }

    async function handleDeslike() {
        const [user, ...rest] = users;

        await api.post(`/devs/${user._id}/deslikes`, null, {
            headers: { user: id },
        })

        setUsers(rest)
    }

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            <View style={styles.cardsContainer}>
                {users.length === 0
                    ? <Text style={styles.empty}>Acabou :(</Text>
                    : (
                        users.map((user, index) => (
                            <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                                <Image style={styles.avatar} source={{ uri: user.avatar }} />
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                </View>
                            </View>
                        ))
                    )}
            </View>
            {
                users.length > 0 && (
                    <View style={[styles.buttonsContanier, {zIndex: 0}]}>
                        <TouchableOpacity style={styles.button} onPress={handleLike}>
                            <Image source={like} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={handleDeslike}>
                            <Image source={deslike} />
                        </TouchableOpacity>
                    </View>
                )
            }
            {
                matchDev && (
                    <View style={[styles.macthContainer, {zIndex: users.length }]}>
                        <Image style={styles.matchImage} source={itsamatch} />
                        <Image style={styles.macthAvatar} source={{ uri: matchDev.avatar }} />

                        <Text style={styles.matchName}>{matchDev.name}</Text>
                        <Text style={styles.matchBio}>{matchDev.bio}</Text>

                        <TouchableOpacity onPress={() => setMatchDev(null)}>
                            <Text style={styles.closeMatch}>FECHAR</Text>
                        </TouchableOpacity>
                    </View>
                )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },
    logo: {
        marginTop: 30,
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden', /* Sem isso o "borderRadius" não seria aplicado em um container */

        // Os atributos abaixo são para fazer o card ficar sobre os outros quando for listado em série
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    avatar: {
        flex: 1,
        height: 300,
    },
    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },
    buttonsContanier: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2, // Para sombra no Android isso basta, mas para IOS seguem as propriedades...

        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },

    macthContainer: {
        ...StyleSheet.absoluteFillObject, //Isso equivale a deixar todas margens = 0 e position = absolute
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',

    },

    matchImage: {
        height: 60,
        resizeMode: 'contain' // Para que a imagem caíba dentro de seu container
    },

    macthAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#FFF',
        marginVertical: 30,
    },
    matchName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF'
    },
    matchBio:{
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30
    },

    closeMatch:{
        fontSize:16,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold',
    },
});