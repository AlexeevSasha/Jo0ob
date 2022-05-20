import {Router} from "express";
import {reqister, login, updateUser} from "../controllers/authController";
import {authMiddleware} from "../middleware/auth";

const router = Router()

router.route('/register').post( reqister)
router.route('/login').post(login)
router.route('/updateUser').patch(authMiddleware,updateUser)

export default router;
