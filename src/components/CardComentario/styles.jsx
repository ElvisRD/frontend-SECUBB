import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerComentario: {
        width: wp(96),
        borderRadius: 6,
        marginTop: hp(2),
        flexDirection: "row",
        backgroundColor: "#F3F1F5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    containerDatosComentario: {
        width: "90%",
        flexDirection: "column",
    },
    containerUsuario: {
        paddingTop: hp(1),
        width: "100%",
        minHeight: hp(5),
        paddingHorizontal: wp(4),
    },
    usuario: {
        fontSize: wp(4),
    },
    nombreUsuario: {
        fontWeight: "bold",
        fontSize: wp(4.5),
    },
    textoDatosComentario:{
        width: "100%",
        marginTop: hp(1),
        paddingVertical: hp(1),
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
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "center",
    },
});

export default styles