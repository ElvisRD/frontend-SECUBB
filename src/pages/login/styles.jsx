import { StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerLogin: {
      width: "100%",
      height: "100%",
      backgroundColor: "white",
      zIndex: 2,
    },
    login: {
      width: "100%",
      height: "100%",
    },
    containerInputsLogin: {
      width: "100%",
      alignItems: "center",
      marginTop: hp(35),
    },
    containerTextoLogin: {
      width: "100%",
      paddingLeft: wp(5.5),
    },
    textBienvenido: {
      fontSize: 25,
    },
    inputLogin: {
      marginTop: hp(1),
      width: "88%",
    },
    containerButtonLogin: {
      width: "100%",
      alignItems: "center",
      marginTop: hp(4),
    },
    botonLogin: {
      width: wp(55),
    },
    containerRegistro: {
      flexDirection: "row",
      marginTop: hp(4)
    },
    textRegistrarse: {
      color: "purple",
    },
    containerOlvidasteContra: {
      width: "100%",
      marginTop: hp(3),
      alignItems: "center",
    },
    containerRegistrateAqui: {
      width: "100%",
      marginTop: hp(3),
      alignItems: "center",
      marginBottom: hp(20),
    },
    textRegistrateAqui: {
      flexDirection: "row"
    },
    containerError: {
      width: "100%",
      paddingLeft: wp(6),
    },
    textoError: {
      color: "red"
    }
});

export default styles;
  