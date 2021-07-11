import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, FlatList, SafeAreaView, TouchableHighlight,TouchableOpacity, Text,ScrollView,View } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import style from '../assets/style'
import firestore from '@react-native-firebase/firestore';
//import CustomButton from '../controls/custombutton'

const db = SQLite.openDatabase({name:'mydata'});


const InicioScreen = function({ navigation }) {

    const [notasWeb, setNotasWeb] = useState(null);
    //const [notas, setNotas] = useState([]);
    const fetchNotas = async() =>{
        try{
            const list = []
            await firestore()
            .collection('notas')
            .get()
            .then((querySnapshot) => {
                //console.log('Total de Notas: ',querySnapshot.size)
                querySnapshot.forEach(doc => {
                    const{title,desc,color}=doc.data();
                    list.push({
                        id_nota:doc.id,
                        title,
                        desc,
                        color
                    });
                })
            })

            setNotasWeb(list);
        }catch(e){
            console.log(e)
        }
    }
    
    useEffect(()=>{
        fetchNotas();
    });

    /* useEffect(function() {
        db.transaction(function(t) {
            // t.executeSql('DROP TABLE IF EXISTS contactos',[],
            //     () => console.log('DROPED TABLE contactos'),
            //     error => console.log({error})
            // );
            t.executeSql(
                'CREATE TABLE IF NOT EXISTS notas (' +
                'id_nota    INTEGER         PRIMARY KEY     AUTOINCREMENT,' +
                'titulo         VARCHAR(20)    NOT NULL,' +
                'descripcion       VARCHAR(200)     NOT NULL,' +
                'color         VARCHAR(6)     NOT NULL' + 
                ');',
                [],
                () => console.log('CREATED TABLE notas'),
                error => console.log({error})
            );
        })
    }, []);

    useEffect(function() {
        navigation.addListener('focus', function() {
            db.transaction(function(t) {
                t.executeSql("SELECT * FROM notas",[], function(tx, res) {
                    let data = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        data.push(res.rows.item(i));
                    }
                    setNotas(data);
                }, (error) => { console.log({ error }) });
            });
        })
    }, [navigation]); */

    const mostrar = function(){
        console.log(notasWeb);
    }

    const notaItem = function({ item }) {
        const onPress = function() {
            // console.log({item});
            navigation.navigate('itemScreen', {id_nota:item.id_nota})
        }
        return (
            <TouchableOpacity onPress={onPress} style={[style.itemContacto,{backgroundColor:`#${item.color}`}]}>
                <Text style={style.itemContactoTitle}>{item.title}</Text>
                <Text style={style.itemNotaDetails}>{item.desc}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView>
            <View>
                <FlatList
                    data={notasWeb}
                    renderItem={notaItem}
                    keyExtractor={i=>i.id_nota}
                />
            </View>
            <View 
                    style={{
                        alignItems:'center'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width:200,
                            margin:20,
                            alignItems:'center',
                            height: 40,
                            justifyContent:'center',
                            borderRadius:30,
                            backgroundColor:'#2F5D62',
                            
                        }}
                        onPress={/* mostrar */ ()=>navigation.navigate('agregarScreen') }
                    ><Text style={{fontSize:15, color:'#FFF'}}>AGREGAR NOTA</Text></TouchableOpacity>
                </View>
        </ScrollView>
    )
}

export default InicioScreen;