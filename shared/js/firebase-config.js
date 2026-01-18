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
const firebaseConfig = {
    apiKey: "AIzaSyBbzvA0nn8Z0xU1M2wQrttGICnFulzieHk",
    authDomain: "wrongyou-games.firebaseapp.com",
    projectId: "wrongyou-games",
    storageBucket: "wrongyou-games.firebasestorage.app",
    messagingSenderId: "273366185286",
    appId: "1:273366185286:web:4772762e39f5d9b371e147",
    measurementId: "G-R020XM6TZ9"
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

