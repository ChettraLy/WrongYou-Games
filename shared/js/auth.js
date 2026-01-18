/**
 * Authentication Utilities for WrongYou Games
 * 
 * Provides helper functions for user authentication using Firebase Auth.
 */

import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInAnonymously,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Signed in:', userCredential.user.email);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('❌ Sign in error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Create new account with email and password
 */
export async function signUpWithEmail(email, password, displayName = null) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update display name if provided
        if (displayName) {
            await updateProfile(userCredential.user, { displayName });
        }
        
        console.log('✅ Account created:', userCredential.user.email);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('❌ Sign up error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        console.log('✅ Signed in with Google:', userCredential.user.email);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('❌ Google sign in error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Sign in anonymously (for guest play)
 */
export async function signInAnonymous() {
    try {
        const userCredential = await signInAnonymously(auth);
        console.log('✅ Signed in anonymously:', userCredential.user.uid);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('❌ Anonymous sign in error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Sign out current user
 */
export async function signOutUser() {
    try {
        await signOut(auth);
        console.log('✅ Signed out successfully');
        return { success: true };
    } catch (error) {
        console.error('❌ Sign out error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Get current user
 */
export function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Check if user is signed in
 */
export function isSignedIn() {
    return auth.currentUser !== null;
}

/**
 * Listen to auth state changes
 * @param {Function} callback - Called when auth state changes
 * @returns {Function} Unsubscribe function
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('No user signed in');
        }
        
        await updateProfile(user, updates);
        console.log('✅ Profile updated');
        return { success: true };
    } catch (error) {
        console.error('❌ Profile update error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Get user display name or fallback
 */
export function getUserDisplayName() {
    const user = auth.currentUser;
    if (!user) return 'Guest';
    return user.displayName || user.email || `Player ${user.uid.substring(0, 6)}`;
}

