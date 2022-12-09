import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerAlerta: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 9

    },
    alerta: {
        width: "100%",
        height: "100%",
    },
    containerBotones: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        height: hp(5),
        marginTop: hp(5),
       
    },
    botonVolver: {
        marginLeft: wp(4.5)
    },
    botonEliminar: {
        position: "absolute",
        right: wp(4.5),
    },
    containerTituloAlerta: {
        width: "100%",
        paddingLeft: wp(5)
        
    },
    tituloAlerta: {
        fontSize: wp(7.5),
        fontWeight: "bold"

    },
    containerFecha: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: wp(5),
        marginTop: hp(0.5),
        
    },
    fecha: {
        fontSize: wp(3.5),
        marginRight: wp(3)
    },
    containerDescripcion: {
        width: "100%",
        flexDirection: "column",
        marginTop: hp(1.5),
        paddingHorizontal: wp(5),
        maxHeight: 200
    },
    atributoAlerta: {
        fontSize: wp(5.2),
        fontWeight: "bold"
    },
    descripcion: {
        fontSize: wp(4)
    },
    containerUbicacion: {
        width: "100%",
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    ubicacion: {
        fontSize: wp(4)
    },
    containerTituloImagen: {
        width: "100%",
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },  
    containerImagen: {
        marginTop: hp(2),
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    imagen: {
        width: wp(90),
        borderRadius: 10,
        height: hp(70)
    },
    containerTextoImagen:{
        width: "100%",
        paddingLeft: wp(5),
        marginTop: hp(1),
    },
    textoImagenNoEncontrada: {
        fontSize: wp(4)
    },
    containerUsuario: {
        width: "100%",
        marginVertical: hp(2),
        paddingHorizontal: wp(5),
    },
    textUsuario: {
        fontSize: wp(5)
    },
    containerBotonVerComentarios: {
        width: "100%",
        marginTop: hp(2),
        alignItems: "center",
    },
    botonComentarios: {
        minWidth: 100,
        width: wp(44),
        marginBottom: hp(5),
    },
    textoBotonComentarios: {
        fontSize: wp(3),
    }
   
})

export default styles