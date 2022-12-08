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
        width: "17%",
        zIndex: 2
    },
    boton:{
        position: "absolute",
        bottom: hp(15.5),
        width: 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "black",
        opacity: 0.4,
        height: 54,
        zIndex: 2
    },
    botonRuta: {
        position: "absolute",
        bottom: hp(15.5),
        width: 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "black",
        opacity: 0.4,
        height: 54,
        right: wp(5),
        zIndex: 2 
    }

})

export default styles