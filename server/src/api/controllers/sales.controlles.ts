import { Request, Response } from "express"
import { SalesDal } from "@/dal/sales/sales-dal"
import db from "@/db/sqlite"

const salesDal = new SalesDal()

export const getSalesData = async (req: Request, res: Response) => {
  try {
    const salesData = await salesDal.getAll()
    res.json({ data: salesData })
  } catch (error) {
    console.error("Failed to retrieve sales data in getSalesData:", error)
    res.status(500).send("Internal Server Error")
  }
}

export const getSalesDataByMetrics = async (req: Request, res: Response) => {
  try {
    const metricNames = req.query.metrics as string
    const salesData = await salesDal.getByMetrics(metricNames)
    res.json(salesData)
  } catch (error) {
    console.error(
      "Failed to retrieve sales data in getSalesDataByMetrics:",
      error
    )
    res.status(500).send("Internal Server Error")
  }
}
