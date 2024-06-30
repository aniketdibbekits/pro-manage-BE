// import mongoose from "mongoose";
//  import { Tasks } from "./task.models.js";
 
// const todoSchema = new mongoose.Schema(
//   {
//     title: String,
//     priority: {
//       type: String,
//       enum: ["HIGH", "MODERATE", "LOW"],
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     tasks: [Tasks.schema],
   
//     date: Date,
//     label: {
//       type: String,
//       enum: ["PROGRESS", "TO-DO", "DONE", "BACKLOG"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Todos = mongoose.model("Todos", todoSchema);


import mongoose from "mongoose";
import { Tasks } from "./task.models.js";

const todoSchema = new mongoose.Schema(
  {
    title: String,
    priority: {
      type: String,
      enum: ["HIGH", "MODERATE", "LOW"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [Tasks.schema],
    date: Date,
    label: {
      type: String,
      enum: ["PROGRESS", "TO-DO", "DONE", "BACKLOG"],
    },
    assign: String, // New field for assigning entity, type String
  },
  {
    timestamps: true,
  }
);

export const Todos = mongoose.model("Todos", todoSchema);

