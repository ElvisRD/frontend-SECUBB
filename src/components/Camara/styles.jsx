import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerCamara: {
        width: wp(100),
        height: hp(105),
        backgroundColor: "black",
        zIndex: 20
    },

    containerBotonesCamara: {
        position: "absolute",
        top: hp(8),
        width: wp(100),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: hp(5),
        paddingHorizontal: wp(6),
        zIndex: 31
    },
    botonVolver: {
        backgroundColor: "gray",
        borderRadius: 100,
    },
    containerBotonFlash: {
        position: "absolute", 
        width: wp(50),
        top: hp(8),
        height: hp(4),
        alignItems: "flex-end",
        right: 0,
        zIndex: 31
    },
    camera: {
        width: "100%",
    },
    containerImagen: {
        width: wp(100),
        height: hp(100),
        backgroundColor: "black ",
    },
    containerBotonSacarFoto: {
        position: "absolute",
        bottom: hp(4),
        width: "100%",
        position: "absolute",
        alignItems: "center",

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