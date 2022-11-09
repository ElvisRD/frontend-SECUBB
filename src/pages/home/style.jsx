import { StyleSheet} from 'react-native';

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
        height: "6.5%",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        zIndex: 6
        
    },
    containerBoton: {
        borderRadius: 100,
        paddingHorizontal: "3%",
        alignItems: "center",
    },
     
    boton: {
        alignItems: "center",
        paddingTop: "1.2%",
        justifyContent: "center"
       
    },
    textBoton: {
        position: "absolute",
        fontSize: 10,
        top: "60%",
    }
});

export default styles;
  