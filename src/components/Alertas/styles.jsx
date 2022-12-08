import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerNoticias: {
        backgroundColor: "white",
        width: "100%",
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
    containerTitle: {
        width: "100%",
        marginTop: hp(5),
    },
    title: {
        fontSize: wp(10),
        paddingLeft: wp(5)
    },
    noticias: {
        width: "100%",
        height: hp(92.5),
        paddingBottom: hp(1),
        marginTop: hp(2),
    },
    containerNoticiasActuales: {
        width: "100%",
        marginBottom: hp(10),
    },
    containerNoAlertas: {
        width: "100%",
        marginTop: hp(1),
        paddingLeft: wp(5),
    },
    textoNoAlertas: {
        fontSize: wp(4),
    }
    
})

export default styles;