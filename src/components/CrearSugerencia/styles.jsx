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
        fontSize: wp(7),
        paddingLeft: hp(2),
    },
    containerTextoSugerencia: {
        width: "100%",
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    texto: {
        fontSize: wp(4),
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
    containerError: {
        width: "100%",
        marginTop: hp(0.5),
        paddingLeft: wp(5.5),
    },
    textoError: {
        color: "red",
    },
    containerBotonEnviar: {
        width: "100%",
        alignItems: "center",
        marginTop: hp(10),
        marginBottom: hp(15),
       
    },
    botonEnviar: {
        width: "45%",
        backgroundColor: "#01579b",
    },
    textoBotonEnviar: {
        fontSize: wp(3.5),
        color: "white",
    }
})

export default styles;