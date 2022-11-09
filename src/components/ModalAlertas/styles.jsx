import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
   
    containerModal: {
        width: "100%",
        height: "100%",
    },
    containerBotonCerrar: {
        marginTop: "10%",
        width: "100%",
        height: "4%"
    },
    botonCerrar: {
        position: "absolute",
        right: "6%"
    },
    textCerrar: {
        fontSize: 20
    },
    tituloAlertas: {
        fontSize: 35,
        paddingLeft: "5%"
        
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