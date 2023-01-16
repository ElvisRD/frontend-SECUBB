import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerAlerta: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 7

    },
    alerta: {
        width: "100%",
        marginTop: hp(1.5),
        height: hp(75),
    },
    
    containerTituloAlerta: {
        width: "100%",
        paddingLeft: wp(5)
        
    },
    tituloAlerta: {
        fontSize: wp(7),
        fontWeight: "bold"

    },
    containerFecha: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: wp(5),
        marginTop: hp(0.5),
        paddingBottom: hp(2),
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 1,
        
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
        fontSize: wp(5.5),
        fontWeight: "bold"
    },
    descripcion: {
        fontSize: wp(3.5)
    },
    containerUbicacion: {
        width: "100%",
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    ubicacion: {
        fontSize: wp(3.5)
    },
    containerDescripcionUbicacion: {
        width: "100%",
        marginTop: hp(2),
        paddingHorizontal: wp(5),
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
        resizeMode: "contain",
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
        fontSize: wp(3.5)
    },
    containerBotonVerComentarios: {
        position: "absolute",
        width: "100%",
        alignItems: "center",
        bottom: hp(2),
  
    },
    botonComentarios: {
        width: wp(40),
        backgroundColor: "#01579b",
        marginBottom: hp(5),
    },
    textoBotonComentarios: {
        fontSize: wp(3),
        color: "white"
    }
   
})

export default styles