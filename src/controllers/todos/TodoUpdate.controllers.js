import { Todos } from "../../models/todo.models.js";
const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, priority, label, date, tasks } = req.body;
    const todo = await Todos.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    todo.title = title || todo.title;
    todo.priority = priority || todo.priority;
    todo.label = label || todo.label;
    todo.date = date || todo.date;
    if (tasks) {
      todo.tasks = tasks.map((task) => ({
        title: task.title,
        completed: task.completed,
      }));
    }
    await todo.save();
    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      updatedTodo: todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { updateTodo };
