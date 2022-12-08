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
        bottom: "0%",
        width: "100%",
        height: hp(7.5),
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        zIndex: 6
        
    },
    containerBoton: {
        borderRadius: 100,
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
        fontSize: 9, 
    }
});

export default styles;
  