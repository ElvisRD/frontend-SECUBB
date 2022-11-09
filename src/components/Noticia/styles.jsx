import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerAlerta: {
        backgroundColor: "red",
        alignItems: "center"

    },
    AlertaCard: {
        width: "90%",
        backgroundColor: "blue",
        flexDirection: "column",
    },
    containerTitulo:{
        justifyContent: "space-between",
        flexDirection: "row"
    },
    titulo:{
        fontSize: 22
    },
    containerDescripcion: {
        width: "100%"
    },
    containerBotones: {
        flexDirection: "row",
        justifyContent: "space-evenly",

    },
    botonComentarios: {
        flexDirection: "row"
    }


})

export default styles;