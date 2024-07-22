import express from "express";
import axios from "axios";
import * as database_call from "../functions.js";

const router = express.Router();

router.post("/user/books", (req,res)=>{
    const id = parseInt(req.body.id)
    res.redirect(`/user/books/${id}`)
})
export default router