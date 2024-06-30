import { Todos } from "../../models/todo.models.js";

const getAllTodos = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user._id is the logged-in user's ObjectId
    const todos = await Todos.find({ $or: [{ user: userId }, { assign: req.user.email }] });
    console.log(todos)
    if (!todos || todos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No todos found for the user",
      });
    }
    console.log(todos)
    res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { getAllTodos };
