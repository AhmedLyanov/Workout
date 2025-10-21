const Router = require("express");
const authController = require("../controllers/auth.controller")
const upload = require("../config/multer")

const authRouter = new Router();

authRouter.post('/registration', upload.single('avatar'), authController.registration);
authRouter.post('/login', authController.login);


module.exports = authRouter;