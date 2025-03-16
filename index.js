import express from "express";
import cors from  "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); //allows your frontend (say on http://localhost:3000) to call your backend API (http://localhost:5000) without browser errors.
app.use(express.json()); //reading requests automatically

app.get("/",async(req,res)=>{
    try{
        const result= await db.query("SELECT NOW()");
        res.status(200).json({message:"Backend working!", serverTime: result.rows[0]});
    }
    catch(error){
        console.error("Error in root route:",error);
        res.status(500).json({error:"Internal server error"});
    }
});

app.get("/help-requests",async(req,res)=>{
    try{
        const result= await db.query("SELECT * FROM help_requests ORDER BY id DESC;");
        res.status(200).json({
            success:true,
            data: result.rows,
        });
    }
    catch(error){
        console.error("Error fetching help requests:",error);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
});

app.post("/request-help",async(req,res)=>{
    const {name,email,phone,category,description,location} = req.body;

    try{
        const result = await db.query
        (`INSERT INTO help_requests (name,email,phone,category,description,location) 
            VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, 
            [name,email,phone,category,description,location]
        );
        res.status(201).json({
            success:true,
            message: "Help request submitted successfully",
            data:result.rows[0],
        });
    }
    catch(err){
        console.error("Error inserting help request:",error);
        res.status(500).json({success:false ,message:"'Server error"});
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});