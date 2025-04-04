import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


import healthcheckRouter from './routes/healthcheck.routes.js'
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/orders.routes.js"

app.use("/api/v1/healthcheck",healthcheckRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/orders",orderRouter)

export { app }