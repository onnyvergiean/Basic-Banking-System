const express = require('express');
const router = express.Router();
const controller = require('../app/controllers');

router.get('/v1/users', controller.users.getUser);
router.get('/v1/users/:id', controller.users.getUserById);
router.delete('/v1/users/:id', controller.users.deleteUser);
router.post('/v1/users', controller.users.createUser);
router.put('/v1/users/:id', controller.users.updateUser);

module.exports = router;
