import express from 'express';
import { getAllPrompts } from '../controller/promptsController';

const router = express.Router();

router.get('/prompts', getAllPrompts);

export default router;