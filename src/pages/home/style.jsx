import { StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
      
    },
    containerMapa: {
        width: "100%",
        height: "100%",
    },
    containerBotones: {
        position: "absolute",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: "#E5E5E5",
        bottom: hp(0),
        width: "100%",
        height: hp(8.5),
        flexDirection: "row",
        justifyContent: "space-around",
        zIndex: 6
        
    },
    containerBoton: {
        borderRadius: 100,
        paddingTop: hp(0.5),
        width: 55,
        height: 55,
        marginTop: "1%",
        alignItems: "center",
    },
     
    boton: {
        alignItems: "center",
        justifyContent: "center"
       
    },
    textBoton: {
        fontSize: 12, 
    },
    containerAlerta: {
        backgroundColor: "white",
    },
    containerTituloAlerta: {
        marginTop: hp(2),
        alignItems: "center",
    },
    textoTituloAlerta: {
        fontSize: wp(4)
    },
    containerTextoAlerta: {
        alignItems: "center",
        marginBottom: hp(2),
    }

});

export default styles;
  