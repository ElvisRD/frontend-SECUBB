import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerAlerta: {
        width: "100%",
        marginVertical: hp(1),
        alignItems: "center",
        justifyContent: "center"

    },
    AlertaCard: {
        width: "94%",
        height: 200,
        marginTop: hp(1.5),
        paddingTop: hp(1),
        backgroundColor: "blue",
        borderRadius: 5,
        flexDirection: "column",
    },
    containerTipo:{
        justifyContent: "space-between",
        paddingHorizontal: wp(4),
        
        alignItems: "center",
        flexDirection: "row"
    },
    textoTipo:{
        fontSize: wp(6)
    },
    textoHora: {
        fontSize: 14,
        marginTop: hp(1)
    },
    containerDescripcion: {
        width: "100%",
        minHeight: 100,
        maxHeight: 150,
        paddingHorizontal: wp(4),
        marginTop: hp(1),
        

    },
    containerImagen: {
        width: "yellow"
    },
    containerBotones: {
        flexDirection: "row",
        marginTop: hp(1.5),
        justifyContent: "space-around",
    },
    containerBotonLike: {
        flexDirection: "row",
    },
    likes: {
        fontSize: wp(4.2),
        marginLeft: wp(0.8)
    },
    containerBotonComentario: {
        flexDirection: "row",
    },
    comentarios: {
        fontSize: wp(4.2),
        marginLeft: wp(0.8)
    },
    botonComentarios: {
        flexDirection: "row"
    }


})

export default styles;