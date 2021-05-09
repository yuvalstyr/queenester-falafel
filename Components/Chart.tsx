import { Container } from "@chakra-ui/layout";
import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      type: "line",
      label: "Profit",
      borderColor: "rgb(54, 162, 235)",
      borderWidth: 2,
      fill: false,
      data: [100, 600, 200, 200, 200, 200, 200],
    },
    {
      type: "bar",
      label: "Expense",
      backgroundColor: "rgb(255, 99, 132)",
      data: [-900, -300, -300, -300, -300, -300, -300],
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Income",
      backgroundColor: "rgb(75, 192, 192)",
      data: [1000, 900, 500, 500, 500, 500, 500],
    },
  ],
};

export const MultiType = () => (
  <Container w={{ base: "100vw", md: "50vw" }} h="100%">
    <Bar
      data={data}
      type="multi"
      options={{
        responsive: true,
        maintainAspectRatio: true,
      }}
    />
  </Container>
);
