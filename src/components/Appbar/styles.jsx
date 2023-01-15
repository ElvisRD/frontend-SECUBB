import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    containerNav: {
        width: "100%",
        height: hp(8),
        backgroundColor: "#01579b",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        
    },
    containerTitulo: {
        width: wp(85),
        justifyContent: "center",
        height: "100%",  
    },
    titulo: {
        fontSize: wp(6),
        paddingLeft: wp(5),
        color: "white"
      
    },
    containerBotonIzquierda: {
        width: wp(15),
        justifyContent: "center",
        alignItems: "center",
        
    },

    containerBotonDerecha: {
        width: wp(15),
        justifyContent: "center",
        alignItems: "center",
    },
    boton: {
        padding: wp(2),
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },

})

export default styles