Birthday Expo Project — Ready to Build APK
=========================================

This project is prepared for Expo/EAS build. It includes:
- App.js (main app)
- assets/ (placeholders + cake images: 153f152b-4829-42a7-b6c1-21757eabb133.png, cake_logo_transparent.png )

IMPORTANT: balloons.json, candle_flame.json, birthday_piano.mp3 are placeholders.
Replace them with real Lottie JSON and MP3 files in /assets before building.

How to build APK (step-by-step)
1) Install dependencies:
   npm install -g expo-cli eas-cli
   npm install

2) Login to Expo:
   eas login

3) Configure EAS build (first time):
   eas build:configure

4) Build APK:
   eas build -p android --profile preview

5) After build completes, Expo will show a download link to the APK.

If you want me to replace placeholders with real assets, provide the files or ask me to fetch recommended free assets and I'll include them.

