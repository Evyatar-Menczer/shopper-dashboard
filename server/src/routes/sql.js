"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sql_1 = __importDefault(require("../db/sql"));
const sql_2 = require("../middleware/sql");
const sqlRouter = express_1.default.Router();
sqlRouter.get("/sales", sql_2.validateSalesMetrics, (req, res) => {
    const metricNames = req.query.metrics;
    const querySelect = metricNames ? metricNames : "*";
    const query = `SELECT ${querySelect} FROM sales_data`;
    sql_1.default.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});
exports.default = sqlRouter;
