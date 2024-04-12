import express from "express"
import cors from "cors"
import sqlRouter from "./routes/sql"
const app = express()

app.use(cors())
app.use(express.json())
app.use("/sql", sqlRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
