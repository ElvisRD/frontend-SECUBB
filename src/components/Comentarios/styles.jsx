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
    containerNav: {
        width: "100%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        
    },
    containerTitle: {
        width: "100%",
        marginTop: hp(2),
        paddingBottom: hp(1),
        alignItems: "center",
    },
    title: {
        fontSize: wp(7),
        paddingLeft: hp(2),
    },
     botonCerrar: {
        borderRadius: 100,
        marginLeft: wp(2)
    },
    iconCerrar: {
        borderRadius: 100,
    },
    containerErrorComentarios: {
        width: "100%",
        marginTop: hp(4),
        paddingLeft: wp(5),
    },
    textoErrorComentario: {
        fontSize: wp(5)
    },
    containerCardComentarioPantallaGrand: {
        width: "100%",
        marginBottom: hp(6),
        height: hp(82),
    },
     containerCardComentarioPantallaPeque: {
        width: "100%",
        marginBottom: hp(6),
        height: hp(70),
    },
    containerUniqueCardComentario: {
        width: "100%",
        marginTop: hp(-2),
        alignItems: "center",
        marginBottom: hp(2),
    },
    containerTextInputComentario: {
        position: "absolute",
        backgroundColor: "white",
        bottom: 0,
        width: "100%", 
        flexDirection: "row", 
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
    },
    containerInputEditComentario: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})
export default styles