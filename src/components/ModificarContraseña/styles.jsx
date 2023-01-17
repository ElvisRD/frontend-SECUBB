import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerModificarContraseña: {
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        zIndex: 8,
        height: "100%"
    },
    modificarContraseña: {
        width: "100%",
        height: "100%",
    },
    containerTitle: {
        width: "100%",
        marginTop: hp(2),
        alignItems: "center",
    },
    title: {
        fontSize: wp(7),
    },
    containerInputsModificarContra: {
        width: "100%",
        alignItems: "center",
        marginTop: hp(16)
    },
    input: {
        width: "88%",
        marginTop: hp(4),
    },
    containerError: {
        width: wp(100),
        marginTop: hp(0.5),
        paddingLeft: wp(6.5),
    },
    textoError: {
        color: "red",
    },
    containerBoton: {
        width: "100%",
        marginTop: hp(25),
        marginBottom: hp(10),
        alignItems: "center",
    },
    botonCambiar: {
        width: wp(55),
    }
    
})

export default styles;