import express from 'express';
import items from './items';

const router = express.Router();
router.use('/items', items);

export default router;