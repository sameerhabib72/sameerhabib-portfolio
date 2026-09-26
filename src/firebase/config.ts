import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestoreDbId =
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
    ? firebaseConfig.firestoreDatabaseId
    : undefined;

function getOrInitDb() {
  try {
    // initializeFirestore with experimentalForceLongPolling eliminates
    // "Could not reach Cloud Firestore backend. Connection failed ... [code=unavailable]"
    // in browser preview/iframe proxies.
    return initializeFirestore(
      app,
      {
        experimentalForceLongPolling: true
      },
      firestoreDbId
    );
  } catch {
    return firestoreDbId ? getFirestore(app, firestoreDbId) : getFirestore(app);
  }
}

// Initialize Firestore with configured database ID
export const db = getOrInitDb();

// Initialize Firebase Authentication
export const auth = getAuth(app);
