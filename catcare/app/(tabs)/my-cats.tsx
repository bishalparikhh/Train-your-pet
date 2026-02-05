import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getCats, Cat } from '../../utils/storage';
import { Alert, Pressable } from 'react-native';
import { deleteCat } from '../../utils/storage';

export default function MyCatsScreen() {
  const router = useRouter();
  const [cats, setCats] = useState<Cat[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadCats();
    }, [])
  );

  async function loadCats() {
    const savedCats = await getCats();
    setCats(savedCats);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cats</Text>

      {cats.length === 0 && (
        <Text style={styles.empty}>No cats added yet 🐾</Text>
      )}

      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
  <Pressable
    onPress={() =>
      router.push({
        pathname: '/(tabs)/add-cat',
        params: { catId: item.id },
      })
    }
    style={styles.card}
  >
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.sub}>Age: {item.age}</Text>

    <Pressable
      onPress={() =>
        Alert.alert(
          'Delete Cat',
          `Are you sure you want to delete ${item.name}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                await deleteCat(item.id);
                loadCats();
              },
            },
          ]
        )
      }
    >
      <Text style={{ color: 'red', marginTop: 4 }}>Delete</Text>
    </Pressable>
  </Pressable>
)}
      />

      <Button title="Add Cat" onPress={() => router.push('/(tabs)/add-cat')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  empty: { color: '#6B7280', marginBottom: 12 },
  card: {
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: { fontSize: 18, fontWeight: '600' },
  sub: { color: '#4B5563' },
});
