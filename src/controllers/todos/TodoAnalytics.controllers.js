import { Todos } from "../../models/todo.models.js";
import moment from "moment";

const analyticsData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userEmail = req.user.email;
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
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid filter type. Use 'day', 'week', or 'month'.",
        });
    }

    const todos = await Todos.find({
      $or: [
        { user: userId },
        { assign: userEmail },
      ],
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const filteredTodos = {
      BACKLOG: todos.filter((x) => x.label === "BACKLOG" || x.assign),
      TODO: todos.filter((x) => x.label === "TO-DO"),
      DONE: todos.filter((x) => x.label === "DONE"),
      PROGRESS: todos.filter((x) => x.label === "PROGRESS"),
      HighPr: todos.filter((x) => x.label !== "DONE" && x.priority === "HIGH"),
      ModeratePr: todos.filter((x) => x.label !== "DONE" && x.priority === "MODERATE"),
      LowPr: todos.filter((x) => x.label !== "DONE" && x.priority === "LOW"),
      dueDateTasks: todos.filter((x) => x.label !== "DONE" && x.date !== null),
    };

    const lengths = {
      BACKLOG: filteredTodos.BACKLOG.length,
      TODO: filteredTodos.TODO.length,
      DONE: filteredTodos.DONE.length,
      PROGRESS: filteredTodos.PROGRESS.length,
      HighPr: filteredTodos.HighPr.length,
      ModeratePr: filteredTodos.ModeratePr.length,
      LowPr: filteredTodos.LowPr.length,
      dueDateTasks: filteredTodos.dueDateTasks.length,
    };

    res.status(200).json({
      success: true,
      message: `Todos for the current ${filterType} retrieved successfully`,
      filteredTodos,
      lengths,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { analyticsData };

// import { Todos } from "../../models/todo.models.js";
// import moment from "moment";

// const analyticsData = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const userEmail = req.user.email;
//     const { filterType } = req.params;
//     let startDate, endDate;

//     switch (filterType) {
//       case "day":
//         startDate = moment().startOf("day").toDate();
//         endDate = moment(startDate).endOf("day").toDate();
//         break;
//       case "week":
//         startDate = moment().startOf("week").toDate();
//         endDate = moment().endOf("week").toDate();
//         break;
//       case "month":
//         startDate = moment().startOf("month").toDate();
//         endDate = moment().endOf("month").toDate();
//         break;
//       default:
//         return res.status(400).json({
//           success: false,
//           message: "Invalid filter type. Use 'day', 'week', or 'month'.",
//         });
//     }

//     const todos = await Todos.find({
//       $or: [
//         { user: userId },
//         { assign: userEmail },
//       ],
//       createdAt: { $gte: startDate, $lte: endDate },
//     });

//     const filteredTodos = {
//       BACKLOG: todos.filter((x) => x.label === "BACKLOG" || (x.label !== "DONE" && x.assign)),
//       TODO: todos.filter((x) => x.label === "TO-DO" && !x.assign),
//       DONE: todos.filter((x) => x.label === "DONE"),
//       PROGRESS: todos.filter((x) => x.label === "PROGRESS"),
//       HighPr: todos.filter((x) => x.label !== "DONE" && x.priority === "HIGH"),
//       ModeratePr: todos.filter((x) => x.label !== "DONE" && x.priority === "MODERATE"),
//       LowPr: todos.filter((x) => x.label !== "DONE" && x.priority === "LOW"),
//       dueDateTasks: todos.filter((x) => x.label !== "DONE" && x.date !== null),
//     };

//     const lengths = {
//       BACKLOG: filteredTodos.BACKLOG.length,
//       TODO: filteredTodos.TODO.length,
//       DONE: filteredTodos.DONE.length,
//       PROGRESS: filteredTodos.PROGRESS.length,
//       HighPr: filteredTodos.HighPr.length,
//       ModeratePr: filteredTodos.ModeratePr.length,
//       LowPr: filteredTodos.LowPr.length,
//       dueDateTasks: filteredTodos.dueDateTasks.length,
//     };

//     res.status(200).json({
//       success: true,
//       message: `Todos for the current ${filterType} retrieved successfully`,
//       filteredTodos,
//       lengths,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// };

// export { analyticsData };

