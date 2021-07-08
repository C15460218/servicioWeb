import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, FlatList, SafeAreaView, TouchableHighlight,TouchableOpacity, Text,ScrollView,View } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import style from '../assets/style'

//import CustomButton from '../controls/custombutton'

const db = SQLite.openDatabase({name:'mydata'});


const InicioScreen = function({ navigation }) {

    const notaItems = function({item}){
        return(
            <TouchableOpacity onPress={onPress} style={style.itemContacto}>
                <Text style={style.itemContactoTitle}>{item.title}</Text>
                <Text style={style.itemContactoDetails}>{item.desc}</Text>
            </TouchableOpacity>
        );
    }

    const [host,setHost] = useState('http://localhost:3000');
    const [notas,setNotas] = useState([]);

    useEffect(function(){
        fetch(`${host}/posts`)
        .then(resp => console.log({resp}))
        .then(json => setNotas(json));
    },[]);

    const [contactos, setContactos] = useState([]);

    useEffect(function() {
        db.transaction(function(t) {
            // t.executeSql('DROP TABLE IF EXISTS contactos',[],
            //     () => console.log('DROPED TABLE contactos'),
            //     error => console.log({error})
            // );
            t.executeSql(
                'CREATE TABLE IF NOT EXISTS contactos (' +
                'id_contacto    INTEGER         PRIMARY KEY     AUTOINCREMENT,' +
                'nombre         VARCHAR(20)    NOT NULL,' +
                'telefono       VARCHAR(200)     NOT NULL' +
                ');',
                [],
                () => console.log('CREATED TABLE contactos'),
                error => console.log({error})
            );
        })
    }, []);

    useEffect(function() {
        navigation.addListener('focus', function() {
            db.transaction(function(t) {
                t.executeSql("SELECT * FROM contactos",[], function(tx, res) {
                    let data = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        data.push(res.rows.item(i));
                    }
                    setContactos(data);
                }, (error) => { console.log({ error }) });
            });
        })
    }, [navigation]);

    const contactoItem = function({ item }) {
        const onPress = function() {
            // console.log({item});
            navigation.navigate('itemScreen', {id_contacto:item.id_contacto})
        }
        return (
            <TouchableOpacity onPress={onPress} style={style.itemContacto}>
                <Text style={style.itemContactoTitle}>{item.nombre}</Text>
                <Text style={style.itemContactoDetails}>{item.telefono}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView>
            <View>
                <FlatList
                    data={notas}
                    renderItem={notaItems}
                    keyExtractor={i=>i.id}
                />
            </View>
            <Button color="green" title="Agregar Nota" onPress={()=>navigation.navigate('agregarScreen')} />
        </SafeAreaView>
    )
}

export default InicioScreen;