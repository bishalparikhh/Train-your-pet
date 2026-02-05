import { View, Text, StyleSheet } from 'react-native';

const tips = [
  'Slow blinking means your cat trusts you.',
  'Tail flicking usually means irritation.',
  'Cats prefer predictable routines.',
  'Soft sounds calm cats better than loud ones.',
];

export default function TipsScreen() {
  return (
    <View style={styles.container}>
      {tips.map((tip, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.text}>{tip}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF7ED',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
  },
});
