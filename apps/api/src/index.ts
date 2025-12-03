import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { serverTiming } from '@elysiajs/server-timing';
import { staticPlugin } from '@elysiajs/static';
import 'dotenv/config';

import { authRoutes } from './routes/auth';
import { healthRoutes } from './routes/health';
import { redis } from './lib/redis';
import { db } from './db';

const app = new Elysia()
  // Plugins
  .use(cors({
    origin: process.env.CORS_ORIGINS?.split(',') || '*',
    credentials: true,
  }))
  .use(serverTiming())
  .use(swagger({
    documentation: {
      info: {
        title: 'Shalom API',
        version: '1.0.0',
        description: 'API for Shalom platform',
      },
      tags: [
        { name: 'auth', description: 'Authentication endpoints' },
        { name: 'health', description: 'Health check endpoints' },
      ],
    },
  }))
  .use(staticPlugin({
    assets: 'uploads',
    prefix: '/uploads',
  }))

  // State
  .decorate('db', db)
  .decorate('redis', redis)

  // Routes
  .use(healthRoutes)
  .use(authRoutes)

  // Error handling
  .onError(({ code, error, set }) => {
    console.error('Error:', error);

    if (code === 'NOT_FOUND') {
      set.status = 404;
      return { error: 'Route not found' };
    }

    if (code === 'VALIDATION') {
      set.status = 400;
      return { error: 'Validation error', details: error.message };
    }

    set.status = 500;
    return { error: 'Internal server error' };
  })

  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
