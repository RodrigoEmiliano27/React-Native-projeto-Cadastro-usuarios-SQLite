import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    containerCampoTextoSenha: {
      backgroundColor: '#1d0f6e',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height:'auto',
      width: '50%',
    },
    
    containerSenha: {
      flexDirection: 'row',
      alignItems: 'center',
      height:'auto',
      width: '100%',
    },
    legendaSenha: {
      fontSize: 20,
      color: 'white',
      fontWeight: '500',
      marginTop:-10
    },
    caixaTextoSenha: {
        flex:1,
        fontSize:20,
        color: 'white',
        fontWeight: '500',
        fontStyle: 'italic',
        color: 'white',
        width: 150,
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        marginRight:5,
        marginLeft:5
      },
    icon: {
      position: 'absolute',
      right: 10, // Adjust this value to control the icon's position
      zIndex:1
    },
  
  });
  




export default styles;