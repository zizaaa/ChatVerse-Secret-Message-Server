const express = require('express');

const { deleteMessage,postSecretMessage,createSecretMessage,getMessage } = require('../controllers/secretMessageControllers');
const authenticateToken = require('../controllers/auth');

const router = express.Router();

router.put('/api/deleteMessage',authenticateToken, deleteMessage);

router.put('/api/postSecretMessage', postSecretMessage);

router.post('/api/createSecretMessage', createSecretMessage);

router.get('/api/getSecretMessage',authenticateToken, getMessage);

module.exports = router