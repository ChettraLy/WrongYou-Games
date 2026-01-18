/**
 * Firestore Database Utilities for WrongYou Games
 * 
 * Provides helper functions for interacting with Firestore database.
 */

import { db } from './firebase-config.js';
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs,
    query,
    where,
    orderBy,
    limit,
    updateDoc,
    serverTimestamp,
    increment
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

/**
 * Save user progress for a game
 */
export async function saveProgress(userId, gameId, progressData) {
    try {
        const progressRef = doc(db, `users/${userId}/progress/${gameId}`);
        await setDoc(progressRef, {
            ...progressData,
            lastPlayed: serverTimestamp()
        }, { merge: true });
        
        console.log('✅ Progress saved for', gameId);
        return { success: true };
    } catch (error) {
        console.error('❌ Save progress error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Get user progress for a game
 */
export async function getProgress(userId, gameId) {
    try {
        const progressRef = doc(db, `users/${userId}/progress/${gameId}`);
        const snapshot = await getDoc(progressRef);
        
        if (snapshot.exists()) {
            return { success: true, data: snapshot.data() };
        } else {
            return { success: true, data: null };
        }
    } catch (error) {
        console.error('❌ Get progress error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Save score to leaderboard
 */
export async function saveScore(gameId, scoreData) {
    try {
        const scoresRef = collection(db, `leaderboards/${gameId}/scores`);
        const scoreDoc = doc(scoresRef);
        
        await setDoc(scoreDoc, {
            ...scoreData,
            timestamp: serverTimestamp(),
            verified: false // Will be verified by cloud function
        });
        
        console.log('✅ Score saved to leaderboard');
        return { success: true, scoreId: scoreDoc.id };
    } catch (error) {
        console.error('❌ Save score error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Get leaderboard for a game
 */
export async function getLeaderboard(gameId, limitCount = 10) {
    try {
        const scoresRef = collection(db, `leaderboards/${gameId}/scores`);
        const q = query(
            scoresRef,
            where('verified', '==', true),
            orderBy('score', 'desc'),
            limit(limitCount)
        );
        
        const snapshot = await getDocs(q);
        const scores = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return { success: true, scores };
    } catch (error) {
        console.error('❌ Get leaderboard error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Get user's personal best scores for a game
 */
export async function getUserBestScores(userId, gameId, limitCount = 5) {
    try {
        const scoresRef = collection(db, `leaderboards/${gameId}/scores`);
        const q = query(
            scoresRef,
            where('userId', '==', userId),
            orderBy('score', 'desc'),
            limit(limitCount)
        );
        
        const snapshot = await getDocs(q);
        const scores = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return { success: true, scores };
    } catch (error) {
        console.error('❌ Get user scores error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId, profileData) {
    try {
        const userRef = doc(db, `users/${userId}`);
        await setDoc(userRef, {
            profile: profileData,
            updatedAt: serverTimestamp()
        }, { merge: true });
        
        console.log('✅ User profile updated');
        return { success: true };
    } catch (error) {
        console.error('❌ Update profile error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Get user profile
 */
export async function getUserProfile(userId) {
    try {
        const userRef = doc(db, `users/${userId}`);
        const snapshot = await getDoc(userRef);
        
        if (snapshot.exists()) {
            return { success: true, profile: snapshot.data().profile };
        } else {
            return { success: true, profile: null };
        }
    } catch (error) {
        console.error('❌ Get profile error:', error.message);
        return { success: false, error: error.message };
    }
}

