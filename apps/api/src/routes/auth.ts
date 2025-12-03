import { Elysia, t } from 'elysia';
import { auth } from '../lib/auth';

export const authRoutes = new Elysia({ prefix: '/api/auth' })
  .all('/*', ({ request }) => auth.handler(request), {
    detail: {
      tags: ['auth'],
      summary: 'Better Auth handler',
      description: 'Handles all authentication routes through Better Auth',
    },
  });
