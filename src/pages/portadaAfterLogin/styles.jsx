import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerPortada: {
        backgroundColor: '#01579b',
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    spinner: {
        marginBottom: hp(2),
    },
    textoCargando: {
        color: "white",
        fontSize: wp(5),
        
    },
    containerTituloAlerta: {
        alignItems: "center",
        marginTop: hp(2),
        
    },
    tituloAlerta: {
        fontSize: wp(5),
    },
    containerTextoAlerta: {
        alignItems: "center",
    },
    textoAlerta:{
        fontSize: wp(3.5),
    },
    containerBotonAlerta: {
        justifyContent: "center",
    },
    textoBotonAlerta: {
        color: "#01579b"
    }
})

export default styles