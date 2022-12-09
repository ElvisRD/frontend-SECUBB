import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   containerModalSugerencia:{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 7,
   },
   modalSugerencia: {
       width: "100%",
       height: "100%",
   },
   containerTitle: {
    width: "100%",
    },
    title: {
        fontSize: wp(10),
        paddingLeft: hp(2),
    },
    botonCerrar: {
        borderRadius: 100,
        marginLeft: wp(2)
    },
    iconCerrar: {
        borderRadius: 100,
    },
    containerTextoSugerencia: {
        width: "100%",
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    texto: {
        fontSize: wp(4.5),
    },
    containerInput: {
        width: "100%",
        marginTop: hp(2),
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "90%",
        zIndex: 7,
    },
    containerBotonEnviar: {
        width: "100%",
        height: 80,
        alignItems: "center",
        marginTop: hp(10),
        marginBottom: hp(25)
    },
    botonEnviar: {
        width: "45%",
    }
})

export default styles;