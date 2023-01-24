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
  
   containerTitle: {
        width: "100%",
        marginTop: hp(2),
        paddingBottom: hp(1),
        alignItems: "center",
    },
    title: {
        fontSize: wp(7),
    },
    sugerencias: {
        width: "100%",
        height: hp(86),
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
    },
    containerTextoAlerta: {
        alignItems: "center",
        marginTop: hp(2),
    },
    textoAlerta: {
        fontSize: wp(4),
    },
    textoBotonAlerta: {
        color: "#01579b"
    }
    
})

export default styles;