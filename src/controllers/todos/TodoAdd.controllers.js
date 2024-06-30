import { Todos } from "../../models/todo.models.js";
const addTodo = async (req, res) => {
  try {
    const { title, priority, label, date, tasks,assign } = req.body;
    const userId = req.user._id;
    const newTodo = new Todos({
      title,
      priority,
      label,
      date,
      tasks: tasks.map((task) => ({
        title: task.title,
        completed: task.completed,
      })),
      assign,
      
      user: userId,
    });
    await newTodo.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      newTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
export { addTodo };
