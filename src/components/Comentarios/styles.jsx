import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerComentarios: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 10
    },
    comentarios: {
        width: "100%",
        height: "100%",
    },
    containerBotonVolver: {
        height: hp(5),
        width: "100%",
        marginTop: hp(5),
        backgroundColor: "white",
       
    },
    botonVolver: {
        position: "absolute",
        marginLeft: wp(4.5)
    },
    containerTituloComentario: {
        width: "100%",
        backgroundColor: "white",
        paddingLeft: wp(5)
    },
    tituloComentario: {
        fontSize: wp(7.5)
    },
    containerErrorComentarios: {
        width: "100%",
        marginTop: hp(4),
        paddingLeft: wp(5),
    },
    textoErrorComentario: {
        fontSize: wp(5)
    },
    containerCardComentario: {
        width: "100%",
        marginBottom: hp(10),
        minHeight: hp(79),
        alignItems: "center",
        backgroundColor: "white"
    },
    containerTextInputComentario: {
        position: "absolute",
        width: "100%", 
        flexDirection: "row", 
        bottom: 0
    },
    textInput: {
        width: wp(82),  
    },
    containerBotonEnviar: {
        width: wp(18),
        height: "100%",
        justifyContent: "center"
       
    },
    botonEnviar: {
        width: "100%",
        height: "55%",
        justifyContent: "center",
        alignItems: "center",
    },
    textoBotonEnviar: {
        fontSize: wp(4)
    }
})
export default styles