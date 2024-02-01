import express from 'express';
import { getAllPrompts, estadisticasPrompts } from '../controller/promptsController';

const router = express.Router();

router.get('/prompts', getAllPrompts);


router.get('/estadisticasPrompts', estadisticasPrompts );

export default router;