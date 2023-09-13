import {
  View
} from 'react-native';

import styles from './styles';


export default function LinhaDupla({item1, item2}) {
    return (
        <View style={styles.containerRow}>
          {item1}
          {item2}
        </View>
    );

};