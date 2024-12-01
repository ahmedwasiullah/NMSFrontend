// src/components/DeviceDetails.js
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';


const ThirdQuad = ({ selectedDevice,state }) => {
  const [deviceData, setDeviceData] = useState({
    totalUpTime: 0.0,
    totalDownTime: 0.0,
    noOfDown: 0,
    noOfUp: 0
  });

  useEffect(() => {
    if (selectedDevice) {
      // Construct the API URL
      const url = `http://localhost:8080/fetch/getDeviceData?tableName=${state}&name=${selectedDevice}`;

      const fetchDeviceData = async () => {
        try {
          const response = await fetch(url);
          
          // Check if the response is ok (status code 200-299)
          if (!response.ok) {
            throw new Error('Failed to fetch device data');
          }

          const data = await response.json();

          // Set the fetched data into state
          setDeviceData({
            totalUpTime: data.totalUpTime,
            totalDownTime: data.totalDownTime,
            noOfDown: data.noOfDown,
            noOfUp: data.noOfUp
          });  // Set the device data from the fetched data
        } catch (error) {
          console.error('Error fetching device data:', error);
          // You can optionally handle errors by setting an error state here
        }
      };

      fetchDeviceData();
    }
  }, [selectedDevice, state]); 

  if (!selectedDevice) return <div>No device selected</div>;

  const chartData = {
    labels: ['Uptime', 'Downtime'],
    datasets: [
      {
        data: [deviceData.noOfUp, deviceData.noOfDown],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  return (
    <div>
      <h3>Device Historical Data</h3>
      <Pie data={chartData} />
      <div>Performance: {deviceData.performance}</div>
      <div>Resource Usage: {deviceData.resourceUsage}</div>
    </div>
  );
};

export default ThirdQuad;
