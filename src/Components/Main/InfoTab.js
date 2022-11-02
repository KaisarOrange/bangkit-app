import React, { useState } from "react";
import { Box, Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { DuitData } from "./Data";
import Chart from "chart.js/auto";
function InfoTab() {
  const [duitData, setDuitData] = useState({});
  return (
    <Box>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>Pemasukan</Tab>
          <Tab>Aset</Tab>
        </TabList>
        <TabPanels>
          <TabPanel mt={10}>
            <Box>
              <Bar
                data={{
                  labels: DuitData.map((data) => data.year),
                  datasets: [
                    {
                      label: "Profit",
                      data: DuitData.map((data) => data.profit),
                      backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                      borderColor: ["rgb(75, 192, 192)"],
                      borderWidth: 1,
                    },
                    {
                      label: "Beban",
                      data: DuitData.map((data) => data.beban),
                      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                      borderColor: ["rgb(255, 99, 132)"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel mt={10}>
            <Box boxSize="md" display="flex" justifyContent="center" m="auto">
              <Doughnut
                data={{
                  labels: DuitData.map((data) => data.year),
                  datasets: [
                    {
                      label: "Profit",
                      data: DuitData.map((data) => data.profit),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 205, 86, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                      ],
                      borderColor: ["rgb(75, 192, 192)"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  animation: {
                    duration: 0,
                  },
                }}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default InfoTab;
