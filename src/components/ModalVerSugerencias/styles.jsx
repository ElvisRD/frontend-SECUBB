import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   containerModalVerSugerencias:{
        width: "100%",
        height: "100%",
        position: "absolute",
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
    botonVolver: {
        borderRadius: 100,
        marginLeft: wp(2)
    },
    iconCerrar: {
        borderRadius: 100,
    },
    sugerencias: {
        width: "100%",
        height: hp(84),
    },
    containerSugerencias: {
        width: "100%",
        paddingTop: hp(2),
    },
    containerNoSugerencias: {
        width: "100%",
        marginTop: hp(4.5),
        paddingLeft: wp(5),
    },
    textoNoSugerencias: {
        fontSize: wp(6),
    }
    
})

export default styles;