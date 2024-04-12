export const metricOptions = ["Units Sold", "Product Views", "Revenue"]

export const formatNumberWithSuffix = (value: number) => {
  return value >= 1e9
    ? (value / 1e9).toFixed(2) + "B"
    : value >= 1e6
    ? (value / 1e6).toFixed(2) + "M"
    : value >= 1e3
    ? (value / 1e3).toFixed(2) + "K"
    : value.toString()
}

export const snakeToTitleCase = (text: string) => {
  return text
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const titleToSnakeCase = (text: string) => {
  return text.toLowerCase().split(" ").join("_")
}

export const camelToTitleCase = (text: string) => {
  let result = text.replace(/([A-Z])/g, " $1")
  result = result.charAt(0).toUpperCase() + result.slice(1)
  return result
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}
