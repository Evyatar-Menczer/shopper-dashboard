import express from "express"
import { validateSalesMetrics } from "@/middleware/sales"
import { getSalesData } from "../controllers/sales.controlles"
const salesRouter = express.Router()

salesRouter.get("/", getSalesData)
salesRouter.get("/metric", validateSalesMetrics, getSalesData)

export default salesRouter
