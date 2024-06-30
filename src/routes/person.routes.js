import express from "express";
import {
    createPerson,getAllPersons,
} from "../controllers/person.controllers.js"


const router = express.Router();

// Define routes
router.post("/persons", createPerson);
router.get("/persons", getAllPersons);
// router.get("/persons/:id", getPersonById);


export default router;
