/**
 * Firebase Configuration for WrongYou Games
 * 
 * This file initializes Firebase services for the platform.
 * Make sure to create a .env file with your Firebase credentials.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// Firebase configuration
// In production, these should come from environment variables
const firebaseConfig = {
    apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "wrongyou-games.firebaseapp.com",
    projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "wrongyou-games",
    storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "wrongyou-games.appspot.com",
    messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
    appId: import.meta.env?.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
    measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
let app;
let auth;
let db;
let analytics;
let storage;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Analytics only in production
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        analytics = getAnalytics(app);
    }
    
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Export Firebase services
export { app, auth, db, analytics, storage };

// Export a function to check if Firebase is ready
export function isFirebaseReady() {
    return !!(app && auth && db);
}

// Export configuration for debugging (remove in production)
export function getFirebaseConfig() {
    return {
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        isReady: isFirebaseReady()
    };
}

