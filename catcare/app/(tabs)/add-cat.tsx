import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useRef } from 'react';;
import { TextInput } from 'react-native';



import {
  getCats,
  saveCats,
  updateCat,
  Cat,
} from '../../utils/storage';
import { createDefaultHealthProfile } from '../../utils/healthDefaults';

export default function AddCatScreen() {
  const router = useRouter();
  const { catId } = useLocalSearchParams<{ catId?: string }>();
  const isEdit = Boolean(catId);

  // Form state
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [neutered, setNeutered] = useState(false);
  const [weightKg, setWeightKg] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>();
  const ageRef = useRef<TextInput>(null);
  const weightRef = useRef<TextInput>(null);
  // Load cat if editing
  useEffect(() => {
    if (isEdit) {
      loadCat();
    }
  }, []);

  async function loadCat() {
    const cats = await getCats();
    const cat = cats.find(c => c.id === catId);

    if (!cat) {
      Alert.alert('Error', 'Cat not found');
      router.back();
      return;
    }

    setName(cat.name);
    setAge(cat.age);
    setGender(cat.gender);
    setNeutered(cat.neutered);
    setWeightKg(cat.weightKg || '');
    setPhotoUri(cat.photoUri);
  }

  // Pick image
  async function pickImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permission needed',
        'Please allow photo access'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  // Save handler
  async function handleSave() {
    if (!name.trim() || !age.trim()) {
      Alert.alert('Missing info', 'Name and age are required');
      return;
    }

    if (isEdit) {
      const cats = await getCats();
      const existing = cats.find(c => c.id === catId);
      if (!existing) return;

      const updatedCat: Cat = {
        ...existing,
        name,
        age,
        gender,
        neutered,
        weightKg,
        photoUri,
      };

      await updateCat(updatedCat);
    } else {
      const newCat: Cat = {
        id: Date.now().toString(),
        name,
        age,
        gender,
        neutered,
        weightKg,
        photoUri,
        health: createDefaultHealthProfile(),
      };

      const cats = await getCats();
      await saveCats([...cats, newCat]);
    }

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEdit ? 'Edit Cat' : 'Add Cat'}
      </Text>

      {/* Photo */}
      <Pressable onPress={pickImage} style={styles.photoBox}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <Text style={styles.photoText}>Add Photo</Text>
        )}
      </Pressable>

      {/* Name */}
      <TextInput
  placeholder="Cat name"
  placeholderTextColor="#9CA3AF"
  value={name}
  onChangeText={setName}
  style={styles.input}
  returnKeyType="next"
  onSubmitEditing={() => ageRef.current?.focus()}
/>


      {/* Age */}
      <TextInput
  ref={ageRef}
  placeholder="Age (years)"
  placeholderTextColor="#9CA3AF"
  value={age}
  onChangeText={setAge}
  keyboardType="numeric"
  style={styles.input}
  returnKeyType="next"
  onSubmitEditing={() => weightRef.current?.focus()}
/>


      {/* Gender */}
      <View style={styles.row}>
        <Text>Gender</Text>
        <View style={styles.genderRow}>
          <Button
            title="Male"
            color={gender === 'male' ? '#FB923C' : '#9CA3AF'}
            onPress={() => setGender('male')}
          />
          <Button
            title="Female"
            color={gender === 'female' ? '#FB923C' : '#9CA3AF'}
            onPress={() => setGender('female')}
          />
        </View>
      </View>

      {/* Neutered */}
      <View style={styles.row}>
        <Text>Spayed / Neutered</Text>
        <Switch value={neutered} onValueChange={setNeutered} />
      </View>

      {/* Weight */}
      <TextInput
  ref={weightRef}
  placeholder="Weight (kg)"
  placeholderTextColor="#9CA3AF"
  value={weightKg}
  onChangeText={setWeightKg}
  keyboardType="decimal-pad"
  style={styles.input}
  returnKeyType="done"
  onSubmitEditing={handleSave}
/>


      <Button
        title={isEdit ? 'Save Changes' : 'Save Cat'}
        onPress={handleSave}
      />
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
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  genderRow: {
    flexDirection: 'row',
    gap: 8,
  },

  photoBox: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#FFE4C7',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },

  photo: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },

  photoText: {
    color: '#6B7280',
  },
});
