import { HTTP_METHOD } from "../utils/types"
import { config } from "../utils/config"

export const getAllData = async () => {
  return await send(`/`, HTTP_METHOD.GET)
}

export const getDataByMetric = async (metrics: string[]) => {
  const params = new URLSearchParams()
  metrics.push("date")
  params.append("metrics", metrics.join(","))
  const url = `/metric?${params.toString()}`
  return await send(url, HTTP_METHOD.GET)
}

const send = async (
  url: string,
  method: HTTP_METHOD = HTTP_METHOD.GET,
  data?: any
) => {
  const requestUrl = `${config.BASE_URL}:${config.DB_PORT}/sales${url}`
  try {
    const response = await fetch(requestUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
    return response.json()
  } catch (err) {
    console.error(err)
    return err
  }
}
