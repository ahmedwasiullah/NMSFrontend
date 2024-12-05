// src/components/LogList.js
import React, { useState, useEffect } from 'react';
const baseUrl=process.env.REACT_APP_BACKEND_URL;

const dateConverter = (timeStamp) => {
  const date = new Date(timeStamp);
  
  // Format the date to a human-readable format using toLocaleString
  const humanReadableDate = date.toLocaleString('en-IN', {
    year: 'numeric',   // Full year (e.g., 2024)
    month: 'long',     // Full month (e.g., November)
    day: 'numeric',    // Day of the month (e.g., 16)
    hour: 'numeric',   // Hour (e.g., 3)
    minute: 'numeric', // Minute (e.g., 00)
    second: 'numeric', // Second (e.g., 00)
    timeZone: 'Asia/Kolkata',  // Set the time zone to IST (Asia/Kolkata)
    // timeZoneName: 'short' // Time zone abbreviation (e.g., IST)
  });
  return humanReadableDate;
};

const SecondQuad = ({onSelectLog, state }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLog,setSelectedLog]= useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        if(state==="")return;
        setLogs([]);
        setLoading(true);
        setError(null);
        
        const url = `${baseUrl}/fetch/getLogs?tableName=${state}`;
       // Fetch data from the API
        const response = await fetch(url);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }

        // Parse the response as JSON
        const data = await response.json();

        // Update the logs state by appending the new logs
        // setLogs((prevLogs) => [...prevLogs, ...data]);
        setError(null);
        setLogs(data);

      } catch (err) {
        // Set error state if an error occurs
        setError('Failed to fetch logs');
        // console.error('Error fetching logs:', err);
      } finally {
        // Set loading to false once the fetch operation is complete
        setLoading(false);
      }
    };

    fetchLogs();  // Call the fetchLogs function

  }, [state]);

const clickedLog=(log)=>{
  onSelectLog(log);
  setSelectedLog(log);
};


  // const handleScroll = (e) => {
  //   if (e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight) {
  //     setPage(page + 1); // Infinite scroll
  //   }
  // };
  // onScroll={handleScroll}
  return (
    <div className="log-list">
      <h3>Last Status</h3>
  <ul>
    <li>
      <div>DEVICE</div>
      <div>STATUS</div>
      <div>TIMESTAMP</div>
      <div>NAME</div>
    </li>
    {logs.map((log) => (
      <li key={log.ip} onClick={() => clickedLog(log)}
      className={selectedLog === log ? 'selected' : ''}
      >       
        <div>{log.ip}</div>
        <div>{log.status}</div>
        <div>{dateConverter(log.timeStamp)}</div>
        <div>{log.name}</div>
      </li>
    ))}
  </ul>
  {loading && <div>Loading logs...</div>}
  {error && <div>{error}</div>}
</div>
  );
};

export default SecondQuad;
