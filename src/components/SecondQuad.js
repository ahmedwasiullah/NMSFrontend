// src/components/LogList.js
import React, { useState, useEffect } from 'react';


const SecondQuad = ({ onSelectLog, state }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const url = `http://localhost:8080/fetch/getLogs?tableName=${state}`;

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
        setError("");
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



  // const handleScroll = (e) => {
  //   if (e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight) {
  //     setPage(page + 1); // Infinite scroll
  //   }
  // };
  // onScroll={handleScroll}
  return (
    <div className="log-list" >
      <ul>
        <li style={{ fontWeight:"600" }}>
          <div>DEVICE</div>
          <div>STATUS</div>
          <div>TIMESTAMP</div>
          <div>NAME</div>
        </li>
        {logs.map((log) => (
          <li key={log.name} onClick={() => onSelectLog(log)}>
            <div>{log.ip}</div>
            <div>{log.status}</div>
            <div>{log.timestamp}</div>
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
