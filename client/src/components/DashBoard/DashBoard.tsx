import Chart from "../Chart/Chart"
import Summary from "../Summary/Summary"
import DataTable from "../DataTable/DataTable"
import { Container } from "./styles"
import { useEffect, useState } from "react"
import { getAllData } from "../../api/sql"

const DashBoard = () => {
  const [dbData, setDbData] = useState<any>(null)
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await getAllData()
    if (response.error) {
      console.error(response)
      return
    }
    setDbData(response.data)
  }
  return (
    <Container>
      <Summary gridArea={"header"} />
      <Chart gridArea={"chart"} />
      <DataTable dbData={dbData} gridArea={"table"} />
    </Container>
  )
}

export default DashBoard
