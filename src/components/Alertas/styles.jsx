import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerNoticias: {
        backgroundColor: "white",
        width: "100%",
    },
    
    containerTitle: {
        width: "100%",
        justifyContent: "center",
        height: "100%",
    },
    title: {
        fontSize: wp(10),
        paddingTop: hp(2.5),
        paddingLeft: wp(2)
    },
    botonCerrar: {
        borderRadius: 100,
        right: wp(2),
    },
    iconCerrar: {
        borderRadius: 100,
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