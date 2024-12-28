# Zpevnikator

## Run

```bash
npm start
```

## Build apk

```
cd android
./gradlew assembleDebug
```

Output: android\app\build\outputs\apk\debug\app-debug.apk

If not rebuilding:

```npm run bundle-android```

## Build aab

```
npx react-native build-android --mode=release
```

Output: android\app\build\outputs\bundle\release\app-release.aab