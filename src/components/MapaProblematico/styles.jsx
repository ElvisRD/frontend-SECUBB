import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerMapa: {
        position: "absolute",
        backgroundColor: 'white',
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
        top: hp(2),
        left: wp(5),
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 100,
        opacity: 0.4,
        zIndex: 3
    },
    pinCalor: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "red",
    }
})

export default styles