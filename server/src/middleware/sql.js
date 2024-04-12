"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSalesMetrics = void 0;
const allowedMetrics = new Set([
    "units_sold",
    "product_views",
    "revenue",
    "date",
]);
const validateSalesMetrics = (req, res, next) => {
    if (req.query.metrics) {
        const metricNames = req.query.metrics;
        const parsedMetricNames = metricNames.split(",");
        const invalidMetric = parsedMetricNames.find((metricName) => !allowedMetrics.has(metricName));
        if (invalidMetric) {
            res
                .status(400)
                .json({ error: `Invalid metric '${invalidMetric}' provided.` });
            return;
        }
    }
    next();
};
exports.validateSalesMetrics = validateSalesMetrics;
