// src/components/DeviceLogs.js
import React, { useState, useEffect } from 'react';


const FourthQuad = ({ selectedDevice,state,days }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedDevice) {
      // Construct the API URL
      const url = `http://localhost:8080/fetch/getDeviceLogsByDays?tableName=${state}&name=${selectedDevice}&days=${days}`;

      const fetchDeviceLogs = async () => {
        try {
          const response = await fetch(url);
          
          // Check if the response is ok (status code 200-299)
          if (!response.ok) {
            throw new Error('Failed to fetch logs');
          }

          const data = await response.json();  // Parse the response to JSON
          setLogs(data);  // Set logs from the fetched data
        } catch (err) {
          setError(err.message);  // Set error message
        } finally {
          setLoading(false);  // Set loading to false after fetch attempt
        }
      };

      fetchDeviceLogs();
    }
  }, [selectedDevice, state,days]);

  if (!selectedDevice) return <div>No device selected</div>;

  return (
    <div>
      <h3>{selectedDevice} Device Logs (Last {days} Days)</h3>
      {loading && <div>Loading logs...</div>}
      {error && <div>{error}</div>}
      <ul>
        {logs.map((log) => (
          <li key={log.timestamp}>
            <div>{log.timestamp}</div>
            <div>{log.ip}</div>
            <div>{log.status}</div>
            <div>{log.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FourthQuad;
