import dotenv from "dotenv";
dotenv.config();
import { app } from "./src/app.js";

import connectDB from "./src/connect/ConnectDB.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("app is running at the above");
    });
  })
  .catch((er) => {
    console.log(er);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello there",
  });
});


