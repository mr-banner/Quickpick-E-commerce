import { app } from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.error("failed to connect to database",error);
    process.exit(1);
})
