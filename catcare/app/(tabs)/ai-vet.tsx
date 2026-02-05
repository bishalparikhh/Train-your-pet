import { View, Text, StyleSheet } from 'react-native';

export default function AIVetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Vet</Text>
      <Text style={styles.text}>
        Educational guidance only. Not a replacement for a real vet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: '#4B5563',
  },
});
