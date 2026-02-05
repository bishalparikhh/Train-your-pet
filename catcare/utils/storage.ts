import AsyncStorage from '@react-native-async-storage/async-storage';

const CATS_KEY = 'MY_CATS';

/* =========================
   HEALTH TYPES
========================= */

export type HealthTask = {
  id: string;
  type: 'vaccine' | 'deworming' | 'grooming';
  title: string;
  lastDone?: string;
  frequencyDays: number;
  nextDue: string;
  notes?: string;
};

export type HealthProfile = {
  vaccines: HealthTask[];
  deworming: HealthTask[];
  grooming: HealthTask[];
};

/* =========================
   CAT TYPE
========================= */

export type Cat = {
  id: string;
  name: string;
  age: string;
  gender: 'male' | 'female';
  neutered: boolean;
  weightKg?: string;
  photoUri?: string;

  health: HealthProfile;
};

/* =========================
   STORAGE FUNCTIONS
========================= */

export async function getCats(): Promise<Cat[]> {
  const data = await AsyncStorage.getItem(CATS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveCats(cats: Cat[]) {
  await AsyncStorage.setItem(CATS_KEY, JSON.stringify(cats));
}

export async function updateCat(updatedCat: Cat) {
  const cats = await getCats();
  const updated = cats.map(cat =>
    cat.id === updatedCat.id ? updatedCat : cat
  );
  await saveCats(updated);
}

export async function deleteCat(catId: string) {
  const cats = await getCats();
  const filtered = cats.filter(cat => cat.id !== catId);
  await saveCats(filtered);
}
