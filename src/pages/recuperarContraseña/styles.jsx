import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerRecuperarContraseña: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      },
      containerTitle: {
        width: "100%",
        marginBottom: hp(2),
      },
      title: {
          fontSize: wp(6),
          paddingLeft: wp(5.5)
      },
      containerTexto: {
        width: "100%",
      },
      texto: {
        fontSize: wp(4),
        paddingLeft: wp(5.5),
      },
      containerInputRecuperarCuenta: {
        width: "100%",
        marginTop: hp(22.5),
        alignItems: "center",
      },
      input: {
        marginTop: hp(1),
        width: wp(88),
      },
      containerBotonRecuperarCuenta: {
        width: "100%",
        alignItems: "center",
        marginTop: hp(5),
        marginBottom: hp(20),
      },
      botonRecuperar: {
        width: wp(55),
      },
      containerError: {
        width: "100%",
        paddingLeft: wp(6),
      },
      textoError: {
        color: "red"
      }
      
})

export default styles;