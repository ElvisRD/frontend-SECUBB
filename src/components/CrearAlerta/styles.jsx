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
        paddingHorizontal: 14,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    },
    
    alertaSospechoso: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    alertaActividadSospechosa: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    alertaEscasaIluminacion: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        borderWidth: 1,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    textAlertas: {
        textAlign: "center",
        marginTop: "6%"
    },
    containerAlertaSola: {
        backgroundColor: "red"
    },
    alertaViolencia: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 13,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    alertaRobo: {
        justifyContent: "center",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
   
    
})

export default styles;