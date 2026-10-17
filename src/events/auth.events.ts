
 // src/events/auth.events.ts

export const AUTH_EVENTS = {
  USER_REGISTERED: 'auth:user-registered',
  USER_LOGGED_IN: 'auth:user-logged-in',
  USER_LOGGED_OUT: 'auth:user-logged-out',
  TOKEN_REFRESHED: 'auth:token-refreshed',
  LOGIN_FAILED: 'auth:login-failed',
} as const;
