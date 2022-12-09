import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
   
    containerModal: {
        width: "100%",
    },
    containerTitle: {
        width: "100%",
        justifyContent: "center",
        height: "100%",
    },
    title: {
        fontSize: wp(10),
        paddingTop: hp(2.5),
        paddingLeft: wp(2)
    },
    botonCerrar: {
        borderRadius: 100,
        right: wp(2),
    },
    iconCerrar: {
        borderRadius: 100,
    },
    
    containerBotonesAlerta: {
        width: "100%",
        height: "100%",
        flexDirection: "column"
    },
    fila: {
        marginTop: "8%",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    containerAlerta:{
        justifyContent: "center",
        alignItems: "center",
        width: "36%",
    },
    alertaLuz: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "gray"
    },
    
    alertaSospechoso: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "gray"

    },
    alertaPerros: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: "gray"
    },

    alertaEmergencia: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: "gray"
    },

    textAlertas: {
        textAlign: "center",
        marginTop: "6%"
    },
    containerAlertaSola: {
        backgroundColor: "red"
    },
   
    
})

export default styles;