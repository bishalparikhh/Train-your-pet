import { View, Pressable, Text } from 'react-native';
import { playClick } from '../../utils/audio';

export default function Clicker() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Pressable
        onPress={playClick}
        style={{
          height:160,
          width:160,
          borderRadius:80,
          backgroundColor:'#FB923C',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Text style={{ color:'#fff', fontSize:28 }}>CLICK</Text>
      </Pressable>
    </View>
  );
}
