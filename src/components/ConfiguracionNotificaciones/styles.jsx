import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerConfiguracionNotificaciones:{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 7,
   },
   
   containerTitle: {
        width: "100%",
        marginTop: hp(1),
    },
    title: {
        fontSize: wp(7),
        paddingLeft: hp(2),
    },
    contanierNotificaciones: {
        width: "100%",
        height: "100%",
    },
    containterDesactivarNotificaciones: {
        width: "100%",
        marginTop: hp(5),
        paddingLeft: wp(5),
        justifyContent: "space-between",
        flexDirection: "row",
    },
    textoNotificaciones: {
        textAlignVertical: "center",
        fontSize: wp(4),
    },
    inputActivarNotificaciones: {
        marginRight: wp(8),
    },
    containerBoton: {
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bottom: hp(10),
    },
    botonGuardar: {
        width: wp(40),
        backgroundColor: "#01579b",
    },
    textoBotonGuardar: {
        fontSize: wp(3.5),
        color: "white",
    } 
});

export default styles;