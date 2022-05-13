import {Router} from "express";
import { createJob, getAllJob, updateJob, deleteJob, showStats} from '../controllers/jobsController'

const router = Router()

router.route('/').post(createJob).get(getAllJob)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)


export default router;
