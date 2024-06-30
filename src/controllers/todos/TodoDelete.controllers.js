import { Todos } from "../../models/todo.models.js";
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Todos.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { deleteTodo };
