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
    containerNav: {
        width: "100%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        
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
        bottom: hp(13),
        width: "100%",
        alignItems: "center",
    },
    botonCerrarSesion: {
        width: wp(40),
        paddingVertical: hp(0.8),
        borderRadius: 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "#01579b",
    },
    textCerrarSesion:{
        fontSize: wp(4),
        color: "white"
    }
    

})

export default styles;