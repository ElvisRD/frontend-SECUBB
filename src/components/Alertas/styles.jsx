import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const styles = StyleSheet.create({
    containerAlertas: {
        backgroundColor: "white",   
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
        paddingTop: hp(3.5),
        paddingLeft: wp(2)
    },
    botonCerrar: {
        borderRadius: 100,
        right: wp(2),
    },
    iconCerrar: {
        borderRadius: 100,
    },
    
    alertasPantallaGrand: {
        width: "100%",
        height: hp(84),
        flexGrow: 0,
        
    },
    alertasPantallaPeque: {
        width: "100%",
        height: hp(79),
        backgroundColor: "white",
    },
    containerAlertasActuales: {
        width: "100%",
    },
    containerNoAlertas: {
        width: "100%",
        marginTop: hp(4.5),
        paddingLeft: wp(5),
    },
    textoNoAlertas: {
        fontSize: wp(6),
    }
    
})

export default styles;