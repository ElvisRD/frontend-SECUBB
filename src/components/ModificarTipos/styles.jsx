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
   modificarTipos: {
      width: "100%",
      height: "100%",
   },
   containerTitle: {
      width: "100%",
      marginTop: hp(2),
      alignItems: "center",
   },
   title: {
      fontSize: wp(7),
   },
   containerInputs: {
      width: "100%",
      marginTop: hp(16),
   },
   containerSelect: {
      width: "100%",
      alignItems: "center",
   },
   tituloSelect: {
      fontSize: wp(4.5),
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
      fontSize: wp(4.5),
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
      width: wp(45),
      backgroundColor: "#01579b"
   },
   
})

export default styles;