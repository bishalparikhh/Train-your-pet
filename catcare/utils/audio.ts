import { Audio } from 'expo-av';

let sound: Audio.Sound | null = null;
let isPlaying = false;

export async function playClick() {
  try {
    if (!sound) {
      sound = new Audio.Sound();
      await sound.loadAsync(
        require('../assets/sounds/click.wav'),
        { shouldPlay: false }
      );
    }

    if (isPlaying) return; // prevent overlap

    isPlaying = true;
    await sound.replayAsync();
    isPlaying = false;
  } catch (e) {
    console.log('Audio error:', e);
    isPlaying = false;
  }
}
