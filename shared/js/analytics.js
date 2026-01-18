/**
 * Analytics Utilities for WrongYou Games
 * 
 * Provides helper functions for tracking user events with Firebase Analytics.
 */

import { analytics } from './firebase-config.js';
import { logEvent } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

/**
 * Track game start event
 */
export function trackGameStart(gameId) {
    if (!analytics) return;
    
    logEvent(analytics, 'game_start', {
        game_id: gameId,
        timestamp: Date.now()
    });
    console.log('📊 Analytics: Game started -', gameId);
}

/**
 * Track game complete event
 */
export function trackGameComplete(gameId, score, level) {
    if (!analytics) return;
    
    logEvent(analytics, 'game_complete', {
        game_id: gameId,
        score: score,
        level: level,
        timestamp: Date.now()
    });
    console.log('📊 Analytics: Game completed -', gameId, 'Score:', score);
}

/**
 * Track level complete event
 */
export function trackLevelComplete(gameId, level, score, timeSpent) {
    if (!analytics) return;
    
    logEvent(analytics, 'level_complete', {
        game_id: gameId,
        level: level,
        score: score,
        time_spent: timeSpent
    });
    console.log('📊 Analytics: Level completed -', gameId, 'Level:', level);
}

/**
 * Track achievement unlock
 */
export function trackAchievement(achievementId, gameId) {
    if (!analytics) return;
    
    logEvent(analytics, 'unlock_achievement', {
        achievement_id: achievementId,
        game_id: gameId
    });
    console.log('📊 Analytics: Achievement unlocked -', achievementId);
}

/**
 * Track user sign up
 */
export function trackSignUp(method) {
    if (!analytics) return;
    
    logEvent(analytics, 'sign_up', {
        method: method // 'email', 'google', 'anonymous'
    });
    console.log('📊 Analytics: User signed up -', method);
}

/**
 * Track user login
 */
export function trackLogin(method) {
    if (!analytics) return;
    
    logEvent(analytics, 'login', {
        method: method
    });
    console.log('📊 Analytics: User logged in -', method);
}

/**
 * Track custom event
 */
export function trackCustomEvent(eventName, eventParams = {}) {
    if (!analytics) return;
    
    logEvent(analytics, eventName, eventParams);
    console.log('📊 Analytics: Custom event -', eventName, eventParams);
}

/**
 * Track page view
 */
export function trackPageView(pagePath, pageTitle) {
    if (!analytics) return;
    
    logEvent(analytics, 'page_view', {
        page_path: pagePath,
        page_title: pageTitle
    });
    console.log('📊 Analytics: Page view -', pagePath);
}

/**
 * Track error
 */
export function trackError(errorMessage, errorContext = {}) {
    if (!analytics) return;
    
    logEvent(analytics, 'error', {
        error_message: errorMessage,
        ...errorContext
    });
    console.log('📊 Analytics: Error tracked -', errorMessage);
}

