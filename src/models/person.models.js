import mongoose from "mongoose"
const personSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        // unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
      },
      user: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required:true, // assuming there is a User model
        }
      
    },
    {
      timestamps: true,
    }
  );
  
  // Define the Person model
  export const Persons = mongoose.model("Persons", personSchema);