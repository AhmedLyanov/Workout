const Router = require("express");
const authController = require("../controllers/auth.controller")
const upload = require("../config/multer")

const authRouter = new Router();

authRouter.post('/registration', upload.single('avatar'), authController.registration);



// getUsersRole
authRouter.get('/role/admin', authController.getUsersRolesAdmin)
authRouter.get('/role/user', authController.getUsersRolesUser)
authRouter.get('/role/student', authController.getUsersRolesStudent)

module.exports = authRouter;