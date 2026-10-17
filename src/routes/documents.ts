
import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Get documents belonging to the authenticated user
router.get('/', authenticate, async (req, res, next) => {
  try {
    const docs = await prisma.document.findMany({
      where: { userId: req.user!.id },
    });

    res.json(docs);
  } catch (error) {
    next(error);
  }
});

export default router;

