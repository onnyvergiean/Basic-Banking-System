const express = require('express');
const router = express.Router();
const controller = require('../app/controllers');

router.get('/v1/users', controller.users.getUser);
router.get('/v1/users/:id', controller.users.getUserById);
router.delete('/v1/users/:id', controller.users.deleteUser);
router.post('/v1/users', controller.users.createUser);
router.put('/v1/users/:id', controller.users.updateUser);

router.post('/v1/accounts/:id', controller.accounts.createAccount);
router.get('/v1/accounts/:id', controller.accounts.getAccounts);
router.get('/v1/accounts/:id/:accountId', controller.accounts.getDetailAccount);

router.post('/v1/transactions/', controller.transactions.createTransaction);
router.get('/v1/transactions/', controller.transactions.getTransactions);
router.get(
  '/v1/transactions/:id',
  controller.transactions.getDetailTransaction
);

module.exports = router;
