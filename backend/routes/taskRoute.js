import express from "express"
import { addTask, getTask, removeTask,editTask, markTaskDone} from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addTask", requireAuth, addTask)
router.post("/editTask", requireAuth, editTask)
router.post("/markTaskDone", requireAuth, markTaskDone)
router.get("/getTask",requireAuth, getTask)
router.get("/removeTask",requireAuth, removeTask)

export default router;