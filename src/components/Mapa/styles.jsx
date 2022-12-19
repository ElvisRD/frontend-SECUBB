import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    mapa: {
        justifyContent: 'center',
        width: "100%",
        height: hp(110),
        zIndex: 1,
    },
    makerMapa: {
        position: "absolute",
        justifyContent: "center",
        top: hp(47),
        width: wp(17),
        zIndex: 2
    },
    botonPregunta: {
        position: "absolute",
        top: hp(5),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "black",
        opacity: 0.4,
        padding: 4,
        right: wp(5),
        zIndex: 2 
    },
    boton:{
        position: "absolute",
        bottom: hp(16.5),
        padding: 5.5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "black",
        opacity: 0.35,
        zIndex: 2
    },
    botonRuta: {
        position: "absolute",
        bottom: hp(16.5),
        width: 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "black",
        opacity: 0.4,
        height: 54,
        right: wp(5),
        zIndex: 2 
    },

    containerTiposAlertas: {
        position: "absolute",
        width: "100%",
        height: "50%",
        backgroundColor: "white",
        zIndex: 3,
    },
    containerTitle: {
        width: "100%",
        justifyContent: "center",
        height: "100%",
    },
    title: {
        fontSize: wp(8),
        paddingTop: hp(2.5),
    },
    botonCerrar: {
        borderRadius: 100,
        right: wp(2),
    },
    iconCerrar: {
        borderRadius: 100,
    },
    containerAlertas: {
        width: "100%",
        height: "70%",
        //backgroundColor: "pink",
        //borderWidth: 2,
    },
    pinRepresentado: {
        marginTop: hp(2),
        marginLeft: wp(2),
        flexDirection: "row",
        alignItems: "center",
    },
    textTipoAlerta: {
        fontSize: wp(4.5),
    },
    containerPinDepartamentos: {
        alignItems: "center",
    }

})

export default styles