import {
     Text,TouchableOpacity
} from 'react-native';

import styles from './styles';

export default function BotaoComTexto({texto, clique}) {
    return (
      <TouchableOpacity style={[styles.botao,styles.sombra]} onPress={()=>clique()}> 
        <Text style={styles.legenda}>{texto}</Text>       
      </TouchableOpacity>
    );

};