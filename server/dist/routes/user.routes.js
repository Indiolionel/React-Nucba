"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const getToken_1 = require("../middleware/getToken");
const router = (0, express_1.Router)();
router.post('/', user_controllers_1.UserControllers.create);
// @ts-ignore
router.get('/', getToken_1.getTokenFromRequest, user_controllers_1.UserControllers.getAll);
router.post('/login', user_controllers_1.UserControllers.login);
router.get('/:id', user_controllers_1.UserControllers.getById);
router.get('/order/:id', user_controllers_1.UserControllers.getOrderByIdUser);
// router.put('/:id', AuthorsController.updateOne);
router.delete('/:id', user_controllers_1.UserControllers.delete);
exports.default = router;
