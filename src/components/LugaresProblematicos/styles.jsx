import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerModalLugaresProblematicos:{
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        zIndex: 7,
        height: "100%"
    },
    modalLugares: {
        width: "100%",
        height: "100%"
    },
    containerTitle: {
        width: "100%",
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
    containerLugares: {
        width: "100%",
        marginTop: hp(2),
        marginBottom: hp(1),
        justifyContent: "center",
        alignItems: "center",
        zIndex: 7
    },
    tituloSelect: {
        fontSize: wp(5),
    },
    
    select: {
        marginTop: hp(3),
        width: "80%",
        backgroundColor: "gray",
        zIndex: 20

    },
    containerInputFechas: {
        width: "100%",
    },
    containerTituloFecha: {
        width: "100%",
        marginTop: hp(3),
        paddingLeft: wp(5)
    },
    tituloFecha: {
        fontSize: wp(5)
    },
    containerFechaInicio: {
        marginTop: hp(2),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: hp(2)
    },
    containerInputFecha: {
        width: wp(40),
    },
    containerFechaFinal: {
        marginTop: hp(2),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: hp(2)
    },
    containerBotonMostrarLugares: {
        width: "100%",
        marginTop: hp(6),
        height: 100,
        alignItems: "center"
    }
    
})

export default styles;