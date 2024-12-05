// src/components/DeviceDetails.js
import React, { useState, useEffect ,useRef } from 'react';
import { Pie } from 'react-chartjs-2';


const FifthQuad = ({ selectedDevice,state,days }) => {
  const [deviceData, setDeviceData] = useState({
    totalUpTime: 0.0,
    totalDownTime: 0.0,
    noOfDown: 0,
    noOfUp: 0
  });
  // const prevSelectedDevice = useRef(selectedDevice);
  const prevState = useRef(state);

  useEffect(() => {

    if (prevState.current !== state) {
      // If `state` has changed, set all device data to null
      setDeviceData({
        totalUpTime: 0.0,
        totalDownTime: 0.0,
        noOfDown: 0,
        noOfUp: 0
      });
      
    }
    if (selectedDevice) {
      // Construct the API URL
      const url = `http://localhost:8080/fetch/getDeviceDataByDays?tableName=${state}&name=${selectedDevice}&days=${days}`;

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
            totalUpTime: data.totalUpTime/3600,
            totalDownTime: data.totalDownTime/3600,
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
    // prevSelectedDevice.current = selectedDevice;
    prevState.current = state;

  }, [selectedDevice, state, days]); 

  if (!selectedDevice) return <div>No device selected</div>;


  const chartData = {
    labels: ['Total Uptime', 'Total Downtime'],
    datasets: [
      {
        data: [deviceData.totalUpTime.toFixed(0), deviceData.totalDownTime.toFixed(0)],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  return (
    <div>
      <h3 >{selectedDevice} Data In Terms of Hours of past ({days}) days</h3>
      <Pie data={chartData} />
      <div>Performance: {(deviceData.totalUpTime*100/(deviceData.totalUpTime+deviceData.totalDownTime)).toFixed(2)}%</div>
      {/* <div>Resource Usage: {deviceData.resourceUsage}</div> */}
    </div>
  );
};

export default FifthQuad;
