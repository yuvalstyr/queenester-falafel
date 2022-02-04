import { Container } from "@chakra-ui/layout"
import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { allWeekDays, formatDay } from "../utils/dateFns"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const datasetsConfig = [
  {
    label: "Cost",
    backgroundColor: "rgb(255, 99, 132)",
    borderColor: "white",
    borderWidth: 2,
  },
  {
    label: "Income",
    backgroundColor: "rgb(75, 192, 192)",
  },
]

const options = {
  responsive: true,
  maintainAspectRatio: true,
}

function createChartData({ dbData, pickedDate }) {
  const date = formatDay({ date: pickedDate })
  const days = allWeekDays({ date })
  const labels = days.map((d) =>
    formatDay({ date: new Date(d), formatConfig: "iii" })
  )
  const datasets = datasetsConfig.map((dataset) => {
    const data = days.map(
      (day) => dbData[dataset.label.toLowerCase()]?.[day] ?? 0
    )
    return { ...dataset, data }
  })
  return { datasets, labels }
}

export const Chart = ({ dbData, pickedDate }) => {
  const chartData = createChartData({ dbData, pickedDate })
  return (
    <Container width="100%" h="100%">
      <Bar data={chartData} options={options} />
    </Container>
  )
}
