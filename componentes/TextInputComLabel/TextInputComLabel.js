import {
     View,Text,TextInput
} from 'react-native';

import styles from './styles';

export default function TextInputComLabel({label, onchange, name}) {
    return (
      <View style={styles.containerCampoTexto}>
        <Text style={styles.legenda}>{label}</Text>
        <TextInput 
          style={styles.caixaTexto}
          keyboardType='ascii-capable'
          onChangeText={(texto)=> onchange(texto)}
          value={name}
        >
        </TextInput>
      </View>
    );

};