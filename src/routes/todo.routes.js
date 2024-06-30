import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
  labelCreate,
  getParticularTodo,
  filterTodosByDate,
  analyticsData,
  updateCheck,

} from "../controllers/todos/index.js";
const router = Router();
router.get("/", getAllTodos);

router.route("/addtodo").post(addTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
router.put("/label/:id", labelCreate);
router.get("/particular/:id", getParticularTodo);
router.get("/filter/:filterType", filterTodosByDate);
router.get("/analytics/:filterType", analyticsData);
router.put("/checkupdate/:id", updateCheck);
export default router;
