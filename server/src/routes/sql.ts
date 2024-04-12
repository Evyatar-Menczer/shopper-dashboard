import express, { Request, Response } from "express"
import db from "../db/sql"
import { validateSalesMetrics } from "../middleware/sql"

const sqlRouter = express.Router()

sqlRouter.get("/sales", validateSalesMetrics, (req: Request, res: Response) => {
  const metricNames = req.query.metrics as string
  const querySelect = metricNames ? metricNames : "*"
  const query = `SELECT ${querySelect} FROM sales_data`
  db.all(query, (err: Error, rows: Array<any>) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }

    res.json({ data: rows })
  })
})

export default sqlRouter
