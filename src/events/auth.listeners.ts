
 // src/events/auth.listeners.ts

import { appEvents } from '../lib/events';
import { prisma } from '../lib/prisma';
import { AUTH_EVENTS } from './auth.events';

// Listener 1: Log new user registrations
appEvents.on(AUTH_EVENTS.USER_REGISTERED, async (user) => {
  try {
    await prisma.usageLog.create({
      data: {
        userId: user.id,
        action: 'signup',
        tokens: 0,
        costUsd: 0,
        metadata: JSON.stringify({
          email: user.email,
          tier: user.tier,
          registeredAt: new Date().toISOString(),
        }),
      },
    });
  } catch (error) {
    console.error('Failed to log signup:', error);
  }
});

// Listener 2: Create a welcome conversation
appEvents.on(AUTH_EVENTS.USER_REGISTERED, async (user) => {
  try {
    await prisma.conversation.create({
      data: {
        userId: user.id,
        title: 'Welcome to DocuChat',
      },
    });
  } catch (error) {
    console.error(
      'Failed to create welcome conversation:',
      error,
    );
  }
});

// Listener 3: Log successful logins
appEvents.on(AUTH_EVENTS.USER_LOGGED_IN, async (data) => {
  try {
    await prisma.usageLog.create({
      data: {
        userId: data.userId,
        action: 'login',
        tokens: 0,
        costUsd: 0,
        metadata: JSON.stringify({
          deviceInfo: data.deviceInfo,
          loginAt: new Date().toISOString(),
        }),
      },
    });
  } catch (error) {
    console.error('Failed to log login:', error);
  }
});

// Listener 4: Track failed login attempts
appEvents.on(AUTH_EVENTS.LOGIN_FAILED, async (data) => {
  try {
    console.warn(
      `Failed login attempt for ${data.email} from ${data.deviceInfo ?? 'unknown device'}`,
    );
  } catch (error) {
    console.error('Failed to log failed login:', error);
  }
});
