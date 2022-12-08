import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerMapa: {
        position: "absolute",
        backgroundColor: 'white',
        marginTop: hp(4),
        zIndex: 8,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: hp(100),
    },
    mapa: {
        width: "100%",
        height: "100%"
    }, 
    boton: {
        position: "absolute",
        top: hp(3),
        left: wp(5),
        width: 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "black",
        opacity: 0.4,
        height: 54,
        zIndex: 2
    }
})

export default styles