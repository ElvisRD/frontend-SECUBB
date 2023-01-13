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

  //*Registro style

  containerRegistrar: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    zIndex: 2,
  },
  containerNav: {
    width: "100%",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    
  },
  Registrar: {
    width: "100%",
    height: "100%",
  },
  containerInputsRegistro: {
    width: "100%",
    alignItems: "center",
    marginTop: hp(18),
  },
  containerTituloRegistro: {
    width: "100%",
    paddingLeft: wp(5.5),
  },
  tituloRegistro: {
    fontSize: 25,
  },
  containerTextoExplicativo: {
    width: "100%",
    marginTop: hp(1),
    paddingHorizontal: wp(5.5),
  },
  textoExplicativo: {
    fontSize: 16,
  },
  inputRegistro: {
    width: "88%",
    marginTop: hp(1.5),
  },
  containerError: {
    width: "100%",
    paddingLeft: wp(6),
  },
  textoError: {
    color: "red"
  },
  containerBotonRegistro: {
    width: "100%",
    alignItems: "center",
    marginTop: hp(4),
    marginBottom: hp(20),
  },
  botonRegistrar: {
    width: wp(55),
  },
 
  //* Recuperar contraseña style

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
  }
  
});

export {styles};
  