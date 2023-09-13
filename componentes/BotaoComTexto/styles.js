import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
  botao: {
    width: '45%',
    backgroundColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical:10,
    marginBottom:5,
    marginTop:15,
    marginLeft: 10,
    borderColor: '#4d2cda',
    borderWidth: 1,
    borderRadius: 10,
  },
  sombra:{
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity:  0.21,
    shadowRadius: 7.68,
    elevation: 10
  },
  legenda: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  }
  
  });
  




export default styles;