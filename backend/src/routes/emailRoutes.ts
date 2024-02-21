const express = require('express');
const { enviarInforme } = require('../controller/emailController');

const router = express.Router();

router.post('/enviar_informe', enviarInforme);

export default router;