import React from 'react'
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { Alert, Button, SafeAreaView, Text, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import style from '../assets/style'
import { TouchableOpacity } from 'react-native';

import firestore from '@react-native-firebase/firestore';

const db = SQLite.openDatabase({name:'mydata'}, ()=>console.log('CONNECTED ITEM'))

const ItemScreen = function({ route, navigation }) {
    const id_nota = route.params.id_nota;
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [color,setColor] = useState('')

    
    function onModificarPress() {
        navigation.navigate('modificarScreen', {id_nota})
    }

    function onEliminarPress(){
        firestore()
        .collection('notas')
        .doc(id_nota)
        .delete()
        .then(() => {
            Alert.alert('Nota Eliminada!');
        });
        navigation.navigate('inicioScreen');
    }

    /* function onEliminarPress() {
        Alert.alert('¿Desea elminar?',
            '¿Está seguro que desea elminar el registro?\nEsta acción no se puede deshacer',
            [
                {
                    text: "Sí",
                    onPress: (v) => {
                        db.transaction(tx => {
                            tx.executeSql(
                                'DELETE FROM notas WHERE id_nota = ?',
                                [id_nota],
                                (tx, res) => {
                                    if (res.rowsAffected === 0) {
                                        Alert.alert('Fallo al eliminar', 'No se eliminó el registro')
                                        return;
                                    }

                                    navigation.goBack()
                                },
                                error => console.log(error)
                            )
                        })
                    }
                },
                {
                    text: 'No'
                }
            ])
    } */

    /* useEffect(function(){
        navigation.addListener('focus', function() {
            db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM notas WHERE id_nota = ?",
                [id_nota],
                function(tx2, res) {
                    if (res.rows.length === 0) {
                        alert("No se encontró la nota");
                        return;
                    }
                    let row = res.rows.item(0)
                    setStates(row.titulo, row.descripcion,row.color)
                },
                error => console.log({error}))
            })
        })
    }, [navigation]); */

    const fetchNotas = async() =>{
        try{
            const list = []
            await firestore()
            .collection('notas')
            .doc(id_nota)
            .get()
            .then((querySnapshot) => {
                //console.log('Total de Notas: ',querySnapshot.size)
                const {title,desc,color}=querySnapshot.data();
                    setTitulo(title)
                    setDescripcion(desc)
                    setColor(color)
                
            })
        }catch(e){
            console.log(e)
        }
    }
    
    useEffect(()=>{
        fetchNotas();
    },[navigation]);

    const mostrar = function(){
        console.log(titulo)
        console.log(descripcion)
        console.log(color)
    }
    

    return (
        <SafeAreaView>
            <View style={style.dataBox}>
            <Text style={style.itemContactoTitle}>{titulo}</Text>
            <TouchableOpacity style={[style.itemContacto,{backgroundColor:`#${color}`}]}>
                <Text style={style.itemContactoDetails}>{descripcion}</Text>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                            style={{
                                width:150,
                                alignItems:'center',
                                height: 40,
                                justifyContent:'center',
                                borderRadius:30,
                                backgroundColor:'#FFA900',
                                marginRight:20,
                                marginLeft:25,
                                marginTop:20
                            }}
                            onPress={onModificarPress}
                >
                    <Text style={{fontSize:15, color:'#FFF'}}>MODIFICAR NOTA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                            style={{
                                width:150,
                                alignItems:'center',
                                height: 40,
                                justifyContent:'center',
                                borderRadius:30,
                                backgroundColor:'#CD113B',
                                margin:20
                            }}
                            onPress={onEliminarPress}
                >
                    <Text style={{fontSize:15, color:'#FFF'}}>ELIMINAR NOTA</Text>
                </TouchableOpacity>
                {/* <Button color="orange" title="Modificar" onPress={onModificarPress} />
                <Button color="red" title="Eliminar" onPress={onEliminarPress} /> */}
            </View>
        </SafeAreaView>
    );
}

export default ItemScreen;