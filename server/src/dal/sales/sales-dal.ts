// src/dal/ProductDal.ts

import db from "@/db/sqlite"
import { ISalesDal } from "../types"

export class SalesDal implements ISalesDal {
  getAll(): Promise<any[]> {
    const query = "SELECT * FROM sales_data"
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  }

  async getByMetrics(metrics: string): Promise<any> {
    const query = `SELECT ${metrics} FROM sales_data`
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  }
}
