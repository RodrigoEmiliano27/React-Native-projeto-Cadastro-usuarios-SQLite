import {
     Text,TouchableOpacity, View
} from 'react-native';

import styles from './styles';
import { Ionicons } from '@expo/vector-icons';


export default function CampoSenha({titulo, funcaoMostrarSenha,senha, atualizaSenha,isPasswordVisible}) {
    return (
        <View style={styles.containerCampoTextoSenha}>
          <Text style={styles.legendaSenha}>{titulo}</Text>
          <View style={styles.containerSenha}>    
              <TouchableOpacity style={styles.icon} onPress={funcaoMostrarSenha}> 
                {isPasswordVisible?<Ionicons name="eye-off-sharp" size={24} color="white" />:
                <Ionicons name="eye-sharp" size={24} color="white"/>}
              </TouchableOpacity>  
              <TextInput 
                style={styles.caixaTextoSenha}
                secureTextEntry={isPasswordVisible}
                keyboardType='ascii-capable'
                onChangeText={(texto)=> atualizaSenha(texto)}
                value={senha} />
          </View>
        </View>
    );

};