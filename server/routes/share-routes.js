import express from 'express';

import {
  createNewShare,
  getShareById,
  deleteShareById,
} from '../controllers/share-controller.js';

const router = express.Router();

router.get('/:id', getShareById);
router.post('/', createNewShare);
router.delete('/:id', deleteShareById);

export default router;
