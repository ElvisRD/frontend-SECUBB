import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    containerNoticias: {
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        zIndex: 3,
        height: "100%"
    },
    noticias: {
        width: "100%",
        height: "100%",
    },
    noticiasTitle: {
        marginTop: "8%",
        paddingVertical: "1%",
        borderBottomWidth: 1,
        
    },
    title: {
        fontSize: 35,
        paddingLeft: "5%",
    },
    containerOpciones: {
        backgroundColor: "white",
        marginTop: "4%",
        paddingTop: "4%",
        borderRadius: 10,
        height: "85%"
    
    },
    opcionPerfil: {
        width: "100%",
        marginTop: "4%",
        paddingVertical: "4%",
        paddingLeft: "6%",
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    textOpcion: {
        fontSize: 16
    },
    containerBotonCerrarSesion: {
        position: "absolute",
        bottom: "2%",
        width: "100%",
        alignItems: "center"
    },
    botonCerrarSesion: {
        width: "50%"
    }
})

export default styles;