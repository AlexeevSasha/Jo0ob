import {Router} from "express";
import {reqister, login, updateUser} from "../controllers/authController";

const router = Router()

router.route('/register').post(reqister)
router.route('/login').post(login)
router.route('/updateUser').patch(updateUser)

export default router;
