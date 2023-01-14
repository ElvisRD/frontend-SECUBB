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
        marginTop: hp(1),
    },
    title: {
        fontSize: wp(10),
        paddingLeft: hp(2),
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