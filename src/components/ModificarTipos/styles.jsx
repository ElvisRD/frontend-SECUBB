import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   containerModificarTipos:{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "white",
        zIndex: 10,
   },
   containerNav: {
      width: "100%",
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderColor: "#E5E5E5",
   },
   modificarTipos: {
      width: "100%",
      height: "100%",
   },
   containerTitle: {
      width: "100%",
   },
   title: {
      fontSize: wp(10),
      paddingTop: hp(2),
      paddingLeft: wp(5.5)
   },
   containerInputs: {
      width: "100%",
      marginTop: hp(4),
   },
   containerSelect: {
      width: "100%",
      alignItems: "center",
   },
   tituloSelect: {
      fontSize: wp(6),
   },
   select: {
      width: wp(70),
      backgroundColor: "#E5E5E5",
      marginTop: hp(2),
   },
   containerInputCorreo: {
      width: "100%",
      marginTop: hp(3),
      alignItems: "center",
   },
   textoInputCorreo: {
      fontSize: wp(5),
   },
   inputCorreo: {
      width: wp(88),
      marginTop: hp(1.5),
   },
   containerError: {
      width: wp(100),
      paddingLeft: wp(6),
   }, 
   textoError: {
      color: "red",
   },
   containerBotonModificar: {
      width: "100%",
      marginTop: hp(6),
      marginBottom: hp(15),
      alignItems: "center",
   },
   boton: {
      width: wp(55),
   },
   
})

export default styles;