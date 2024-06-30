import { Todos } from "../../models/todo.models.js";
const doneLabel = async (req, res) => {
  try {
    const userId = req.user._id;
    const label = req.params.label;
    const filteredTodos = await Todos.find({
      user: userId,
      label: label,
    });
    res.status(200).json({
      success: true,
      message: "Todos filtered successfully",
      todos: filteredTodos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { doneLabel };
