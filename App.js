import React, { useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { Audio } from "expo-av";

export default function App() {
  const confettiRef = useRef(null);
  const soundRef = useRef(null);

  useEffect(() => {
    // Preload sound (if provided)
    let sound;
    async function load() {
      try {
        const obj = await Audio.Sound.createAsync(require('./assets/birthday_piano.mp3'));
        sound = obj.sound;
        soundRef.current = sound;
        await sound.setIsLoopingAsync(true);
      } catch (e) {
        console.log('No music asset or failed to load:', e);
      }
    }
    load();
    return () => { if (sound) sound.unloadAsync && sound.unloadAsync(); };
  }, []);

  const playMusic = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.replayAsync();
      }
    } catch (e) {
      console.log('play error', e);
    }
  };

  const handlePress = () => {
    confettiRef.current && confettiRef.current.start && confettiRef.current.start();
    playMusic();
    alert('🎉 Surprise! Happy Birthday!');
  };

  return (
    <View style={styles.container}>
      <LottieView source={require('./assets/balloons.json')} autoPlay loop style={styles.backgroundAnimation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cakeWrapper}>
          {/** Use the actual cake image if present */}
          <Image source={require('./assets/153f152b-4829-42a7-b6c1-21757eabb133.png')} style={styles.cake} resizeMode="contain" />
          <LottieView source={require('./assets/candle_flame.json')} autoPlay loop style={styles.flame} />
        </View>

        <Text style={styles.title}>🎂 Happy 18th Birthday! 🎉</Text>
        <Text style={styles.subtitle}>May your day be as bright and magical as you are.</Text>

        <View style={styles.card}><Text style={styles.cardText}>🎈 Wishing you joy, success, and endless smiles ahead!</Text></View>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Tap for Surprise 🎁</Text>
        </TouchableOpacity>
      </ScrollView>

      <ConfettiCannon count={150} origin={{ x: -10, y: 0 }} autoStart={false} fadeOut ref={confettiRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffeaf6' },
  backgroundAnimation: { position: 'absolute', width: '100%', height: '100%', zIndex: -1 },
  scrollContainer: { alignItems: 'center', padding: 20 },
  cakeWrapper: { alignItems: 'center', marginTop: 40 },
  cake: { width: 260, height: 260, marginBottom: 10 },
  flame: { position: 'absolute', top: '34%', width: 60, height: 90 },
  title: { fontSize: 26, fontWeight: '700', marginTop: 10, color: '#e91e63' },
  subtitle: { fontSize: 16, color: '#444', marginVertical: 12, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, width: '88%', marginTop: 8 },
  cardText: { textAlign: 'center', color: '#333' },
  button: { backgroundColor: '#ff4081', padding: 14, borderRadius: 30, marginTop: 22, width: '70%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' }
});
