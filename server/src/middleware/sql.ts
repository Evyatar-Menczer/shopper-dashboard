import { NextFunction, Request, Response } from "express"

const allowedMetrics = new Set([
  "units_sold",
  "product_views",
  "revenue",
  "date",
])

export const validateSalesMetrics = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.metrics) {
    const metricNames = req.query.metrics as string
    const parsedMetricNames = metricNames.split(",")
    const invalidMetric = parsedMetricNames.find(
      (metricName) => !allowedMetrics.has(metricName as string)
    )

    if (invalidMetric) {
      res
        .status(400)
        .json({ error: `Invalid metric '${invalidMetric}' provided.` })
      return
    }
  }

  next()
}
