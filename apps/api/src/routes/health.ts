import { Elysia } from 'elysia';

export const healthRoutes = new Elysia({ prefix: '/health' })
  .get('/', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }), {
    detail: {
      tags: ['health'],
      summary: 'Health check',
    },
  })

  .get('/db', async ({ db }) => {
    try {
      // Simple query to check DB connection
      await db.execute({ sql: 'SELECT 1' });
      return { status: 'ok', database: 'connected' };
    } catch (error) {
      return { status: 'error', database: 'disconnected', error: String(error) };
    }
  }, {
    detail: {
      tags: ['health'],
      summary: 'Database health check',
    },
  })

  .get('/redis', async ({ redis }) => {
    try {
      await redis.ping();
      return { status: 'ok', redis: 'connected' };
    } catch (error) {
      return { status: 'error', redis: 'disconnected', error: String(error) };
    }
  }, {
    detail: {
      tags: ['health'],
      summary: 'Redis health check',
    },
  });
