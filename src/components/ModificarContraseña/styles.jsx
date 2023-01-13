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
    containerNav: {
        width: "100%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        
    },
    modificarContraseña: {
        width: "100%",
        height: "100%",
    },
    containerTitle: {
        width: "100%",
    },
    title: {
        fontSize: wp(10),
        paddingTop: hp(2),
        paddingLeft: wp(5.5)
    },
    containerInputsModificarContra: {
        width: "100%",
        alignItems: "center",
        marginTop: hp(10)
    },
    input: {
        width: "88%",
        marginTop: hp(1),
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
        marginTop: hp(6),
        marginBottom: hp(20),
        alignItems: "center",
    },
    botonCambiar: {
        width: wp(55),
    }
    
})

export default styles;