import React, {useState} from 'react';
import { 
    View,
    Text,
    SafeAreaView,
    AsyncStorage,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../services/api';

import logo from '../assets/logo.png';

function Book({ navigation }){

    const id = navigation.getParam('id');

    const [data,setData] = useState('');

    async function handleSubmit(id){
        const user_id = await AsyncStorage.getItem('user');
        const response = await api.post(`/spots/${id}/bookings`, {
            date: data,
        },
        {
            headers: {
                user_id
            }
        });

        Alert.alert('Solicitação de reserva enviada.')

        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView
            style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <View style={styles.form}>
                <Text styles={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor='#999'
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={data}
                    onChangeText={text => setData(text)}
                    />
                <TouchableOpacity 
                    onPress={()=>{handleSubmit(id)}}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{handleCancel()}}
                    style={[styles.button, styles.buttonCancel]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonCancel: {
        backgroundColor: '#ccc',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
});

export default withNavigation(Book);