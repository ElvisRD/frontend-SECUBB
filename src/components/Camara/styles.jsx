import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerCamara: {
        width: "100%",
        height: "107%",
        backgroundColor: "black",
        zIndex: 30
    },

    containerBotonesCamara: {
        position: "absolute",
        top: "8%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "5%",
        paddingHorizontal: "6%",
        zIndex: 31
    },
    botonVolver: {
        backgroundColor: "gray",
        borderRadius: 100,
    },
    containerBotonFlash: {
        position: "absolute", 
        width: "50%",
        top: "8%",
        backgroundColor: "red",
        height: "4%",
        alignItems: "flex-end",
        right: "0%",
        zIndex: 31
    },
    camera: {
        width: "100%",
        marginTop: "9%"
    },
    containerImagen: {
        width: "100%",
        height: "100%",
        backgroundColor: "black"
    },
    containerBotonSacarFoto: {
        position: "absolute",
        width: "100%",
        alignItems: "center",
        zIndex: 31,
        bottom: "7.5%"
        
    },
    botonSacarFoto: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    containerBotonesFotoTomada: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: "12%",
        bottom: "10%"
    },
    botonFotoTomada: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        
    },
    

})

export default styles