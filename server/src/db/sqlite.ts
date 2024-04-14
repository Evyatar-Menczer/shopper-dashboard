import sqlite3 from "sqlite3"
import { rawData, categories } from "./data"

const db = new sqlite3.Database(":memory:", async (err) => {
  if (err) {
    console.error(err.message)
    return
  }
  await createTable(db)
})

const createTable = async (db: any) => {
  const categoriesToInsert = Object.keys(categories).join(", ")
  db.run(`CREATE TABLE sales_data (${categoriesToInsert})`, (err: Error) => {
    if (err) {
      console.error(err.message)
    } else {
      insertData(categoriesToInsert)
    }
  })
}

const insertData = (categories: string) => {
  const insert = db.prepare(
    `INSERT INTO sales_data (${categories}) VALUES (?, ?, ?, ?, ?)`
  )
  rawData.forEach((item) => {
    insert.run([...Object.values(item)], (err) => {
      if (err) {
        console.error(err.message)
      }
    })
  })
  insert.finalize(() => {
    console.log("Data base is set up!")
  })
}

export default db
