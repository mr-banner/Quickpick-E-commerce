// routes/subscribe.routes.js

import express from "express";
import { subscribeUser } from "../controllers/subscribe.controller.js";

const router = express.Router();

router.post("/", subscribeUser);

export default router;
