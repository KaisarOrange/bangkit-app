import React, { useState } from 'react';
import { Box, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
function InfoTab({ umkm }) {
  return (
    <Box>
      {umkm === '' ? (
        <></>
      ) : (
        <Tabs size='sm' variant='enclosed'>
          <TabList>
            <Tab>Pemasukan</Tab>
            <Tab>Aset</Tab>
          </TabList>
          <TabPanels>
            <TabPanel mt={10}>
              <Box>
                <Bar
                  data={{
                    labels: umkm.finance.map((data) => data.year),
                    datasets: [
                      {
                        label: 'Omset',
                        data: umkm.finance.map((data) => data.omset),
                        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                        borderColor: ['rgb(75, 192, 192)'],
                        borderWidth: 1,
                      },
                      {
                        label: 'Beban',
                        data: umkm.finance.map((data) => data.beban),
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgb(255, 99, 132)'],
                        borderWidth: 1,
                      },
                      {
                        label: 'Profit',
                        data: umkm.finance.map((data) => data.profit),
                        backgroundColor: ['rgba(3, 138, 255,0.2)'],
                        borderColor: ['rgb(3, 138, 255)'],
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
              <Box boxSize='sm' m='auto' w={{ base: '14rem', lg: '23rem' }}>
                <Doughnut
                  data={{
                    labels: ['Modal', 'Hutang', 'Dana Diterima'],
                    datasets: [
                      {
                        data: [umkm.modal, umkm.hutang, umkm.danaRecieved],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: ['rgb(75, 192, 192)'],
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
      )}
    </Box>
  );
}

export default InfoTab;
