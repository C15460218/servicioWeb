import { StyleSheet } from 'react-native'
const style = StyleSheet.create({
    itemContacto: {
        padding: 12,
        borderWidth:2,
        borderRadius:5,
        margin:10,
        alignContent:'center',
        justifyContent:'center'

    },
    itemContactoTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    itemContactoDetails: {
        fontSize: 14
    },
    btn: {
        fontSize: 48,
        borderRadius: 32,
        color: '#FFF',
        backgroundColor: '#3C3',
        padding: 12,
        textAlign:'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        width:50
    },
    form: {
        borderWidth: 3,
        borderRadius: 8,
        margin: 12,
        padding: 12
    },
    textInput: {
        borderWidth: 1,
        borderColor:'#9B9B9B',
        borderRadius: 4,
        fontSize: 16,
        color: 'black',
        margin: 15
    },
    dataBox: {
        padding: 12
    },
    dataLabel: {
        fontSize: 35
    },
    dataContent: {
        fontSize: 20
    }
});

export default style