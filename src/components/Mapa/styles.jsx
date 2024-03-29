import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    mapa: {
        justifyContent: 'center',
        width: "100%",
        height: hp(114),
        zIndex: 1,
    },
    makerMapa: {
        position: "absolute",
        justifyContent: "center",
        top: hp(50),
        width: wp(17),
        zIndex: 2
    },
    botonPregunta: {
        position: "absolute",
        top: hp(1),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        padding: 4,
        right: wp(2),
        zIndex: 2 
    },
    botonPlusPantallaGrand:{
        position: "absolute",
        bottom: hp(24),
        padding: 5.5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 2
    },
    botonPlusPantallaPeque:{
        position: "absolute",
        bottom: hp(20),
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
        height: hp(45),
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
    },
    

})

export default styles