import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   
    containerModalReportar: {
        width: "100%",
        height: "107%",
        backgroundColor: "white",
        zIndex: 20
    },
    containerNav: {
        width: "100%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        
    },
    ModalReportarAlerta: {
        width: "100%",
        height: "100%",
    },
    containerTitle: {
        width: "100%",
    },
    title: {
        fontSize: wp(10),
        paddingLeft: hp(2.5),
    },
    botonCerrar: {
        position: "absolute",
        borderRadius: 100,
        right: wp(2),
    },
    botonVolver: {
        borderRadius: 100,
        marginLeft: wp(2)
    },
    iconCerrar: {
        borderRadius: 100,
    },
    containerInputsModal: {
        marginTop: "5%",
        alignItems: "center"
    },
    containerInputs: {
        width: "88%"
    },
    containerBotonFoto: {
        width: "30%"
    },
    containerFoto: {
        width: "100%",
        height: 300,
        alignItems: "center",
        marginTop: "5%",
    },
    foto: {
        width: "88%",
        height: "100%",
        borderRadius: 20
    },
    containerFotoYBoton: {
        width: "100%",
        height: 90,
        marginTop: "6%",
        marginBottom: "8%",
        flexDirection: "row"
    },
    containerBotonFoto: {
       width: "40%",
       height: "100%",
    },
    botonFoto: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        marginLeft: "16%"
    },
    containerBotonCrearAlerta: {
        width: "60%",
        alignItems: "flex-end",
        paddingRight: "6%",
        paddingTop: "1.5%"
        
    },
    containerError: {
        width: wp(88),
        marginTop: hp(1)
    },
    textoError: {
        color: "red"
    },
    botonCrearAlerta: {
        width: "65%"
    },

})

export default styles;