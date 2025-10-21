const Router = require("express");
const authController = require("../controllers/auth.controller")
const authRouter = new Router();

authRouter.post('/registration', authController.registration);


module.exports = authRouter;