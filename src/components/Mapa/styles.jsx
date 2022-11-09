import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    
    mapa: {
        justifyContent: 'center',
        width: "100%",
        height: "107%",
        zIndex: 1,
    },
    makerMapa: {
        position: "absolute",
        justifyContent: "center",
        top: "45.5%",
        width: "17%",
        zIndex: 2
    },
    boton:{
        position: "absolute",
        bottom: "14%",
        width: "13%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "black",
        opacity: 0.4,
        height: "5.5%",
        zIndex: 2
    }

})

export default styles