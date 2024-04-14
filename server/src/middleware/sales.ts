import { NextFunction, Request, Response } from "express"

const allowedMetrics = new Set([
  "units_sold",
  "product_views",
  "revenue",
  "date",
])

// A middle ware function that validates the api key for all sales requests.
// I didn't implement the actual validation logic here, just a placeholder.
export const apiKeyValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next()
}

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
