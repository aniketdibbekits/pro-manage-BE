import { Todos } from "../../models/todo.models.js";
import moment from "moment";
const filterTodosByDate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { filterType } = req.params;
    let startDate, endDate;
    switch (filterType) {
      case "day":
        startDate = moment().startOf("day").toDate();
        endDate = moment(startDate).endOf("day").toDate();
        break;
      case "week":
        startDate = moment().startOf("week").toDate();
        endDate = moment().endOf("week").toDate();
        break;
      case "month":
        startDate = moment().startOf("month").toDate();

        endDate = moment().endOf("month").toDate();
        console.log(startDate);
        console.log(endDate);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid filter type. Use 'day', 'week', or 'month'.",
        });
    }
    const todos = await Todos.find({
      user: userId,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    if (todos.length === 0) {
      return res.status(202).json({
        success: true,
        message: `No todos found for the user in the current ${filterType}`,
        todos,
      });
    }

    res.status(200).json({
      success: true,
      message: `Todos for the current ${filterType} retrieved successfully`,
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { filterTodosByDate };
