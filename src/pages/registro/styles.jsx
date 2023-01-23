import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    
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
  }
})

export default styles;