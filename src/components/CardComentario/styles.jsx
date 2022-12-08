import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerComentario: {
        width: wp(96),
        minHeight: 100,
        borderRadius: 6,
        marginTop: hp(2),
        flexDirection: "row",
        backgroundColor: "blue",

    },
    containerDatosComentario: {
        width: "90%",
        height: "100%",
        flexDirection: "column",
    },
    containerUsuario: {
        paddingTop: hp(0.5),
        width: "100%",
        minHeight: 55,
        paddingHorizontal: wp(5),
    },
    usuario: {
        fontSize: wp(5),
    },
    textoDatosComentario:{
        width: "100%",
        marginTop: hp(1.5),
        paddingLeft: wp(5),
        flexDirection: "row",
    },  
    datoComentario: {
        fontSize: wp(3.5),
        marginRight: wp(3),
    },
    containerTextoComentario: {
        width: "100%",
        marginTop: hp(0.5),
        marginLeft: wp(5)
    },  
    textComentario: {
        fontSize: wp(4),
    },
    containerBotonLike:{
        minHeight: 100,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "center",
    },
});

export default styles