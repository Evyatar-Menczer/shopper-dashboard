import express from "express"
import cors from "cors"
import { apiKeyValidation } from "./middleware/sales"
import salesRouter from "./api/routes/sales.route"
const app = express()

app.use(cors())
app.use(express.json())
app.use("/sales", apiKeyValidation, salesRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
