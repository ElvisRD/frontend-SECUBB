import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
   
    containerModal: {
        width: "100%",
    },
    containerBotonCerrar: {
        position: "absolute",
        top: hp(6),
        justifyContent: "center",
        zIndex: 2,
        width: "100%",
        height: hp(6),
    },
    botonCerrar: {
        position: "absolute",
        padding: wp(1),
        right: wp(5),
    },
    tituloAlertas: {
        fontSize: wp(10),
        paddingLeft: wp(5)
        
    },
    containerBotonesAlerta: {
        width: "100%",
        marginTop: hp(5),
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