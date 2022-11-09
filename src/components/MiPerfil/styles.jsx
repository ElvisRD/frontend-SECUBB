import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerPerfil: {
        width: "100%",
        height: "107%",
        backgroundColor: "red",
        zIndex: 20

    },
    perfil: {
        width: "100%",
        height: "100%",
        backgroundColor: "pink"
    },
    containerBotonCerrar: {
        marginTop: "10%",
        width: "100%",
        height: "4%"
    },
    botonCerrar: {
        position: "absolute",
        marginLeft: "5%"
    },
    textoCerrar: {
        fontSize: 20
    },
    containerTituloPerfil: {
        width: "100%"
    },
    tituloPerfil: {
        fontSize: 30,
        marginLeft: "5%"
    },
    containerInputs: {
        width: "100%",
        alignItems: "center"
       
    },
    containerInput: {
        width: "80%"
    }

})

export default styles;