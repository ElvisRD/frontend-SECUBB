import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerMenu: {
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        zIndex: 3,
        height: "100%"
    },
    menu: {
        width: "100%",
        height: "100%",
    },
    containerBotonCerrar: {
        position: "absolute",
        top: hp(6),
        justifyContent: "center",
        zIndex: 2,
        width: "100%",
        height: hp(6),
    },
    botonCerrar: {
        position: "absolute",
        borderRadius: 100,
        padding: wp(1),
        right: wp(5),
    },
    menuTitle: {
        marginTop: hp(5),
    },
    title: {
        fontSize: wp(10),
        paddingLeft: "5%",
    },
    containerOpciones: {
        backgroundColor: "white",
        marginTop: hp(2.5),
    
    },
    opcionPerfil: {
        width: "100%",
        paddingVertical: "4%",
        paddingLeft: "6%",
    },
    textOpcion: {
        fontSize: wp(5),
    },
    containerBotonCerrarSesion: {
        position: "absolute",
        bottom: hp(9),
        width: "100%",
        alignItems: "center"
    },
    botonCerrarSesion: {
        width: "50%"
    }
})

export default styles;