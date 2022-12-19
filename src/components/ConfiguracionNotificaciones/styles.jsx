import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerConfiguracionNotificaciones:{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 7,
   },
   containerNav: {
        width: "100%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
   },
   containerTitle: {
        width: "100%",
        marginTop: hp(1),
    },
    title: {
        fontSize: wp(10),
        paddingLeft: hp(2),
    },
    botonCerrar: {
        borderRadius: 100,
        marginLeft: wp(2)
    },
    iconCerrar: {
        borderRadius: 100,
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
        fontSize: wp(5),
    },
    inputActivarNotificaciones: {
        marginRight: wp(8),
    } 
});

export default styles;