import { Router } from "express";
import verify from "../middleware/verify";

import dailyLogRoute from './dailyLogs';
import userRoute from './user';
import eventRoute from './event';
import todoRoute from './todo';

const router = Router();

router.use('/users', userRoute);
router.use(verify);
router.use('/logs', dailyLogRoute);
router.use('/todos', todoRoute);
router.use('/events', eventRoute);

export default  router;