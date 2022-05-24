import {Router} from "express";
import {createJob, getAllJob, updateJob, deleteJob, showStats, getByIdJob} from '../controllers/jobsController'
import {authMiddleware} from "../middleware/auth";

const router = Router()

router.route('/').post(authMiddleware, createJob).get(getAllJob)
router.route('/stats').get(authMiddleware, showStats)
router.route('/:id').get(authMiddleware, getByIdJob).delete(authMiddleware,deleteJob).patch(authMiddleware,updateJob)

export default router;
