// src/components/DeviceLogs.js
import React, { useState, useEffect} from 'react';
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

const FourthQuad = ({ selectedDevice,state,days }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLog,setSelectedLog]= useState(null);
  // const prevState = useRef(state);
  const clickedLog=(log)=>{
    setSelectedLog(log);
  };
  
  useEffect(() => {
    if (selectedDevice) {
      // Construct the API URL
      
      const url = `${baseUrl}/fetch/getDeviceLogsByDays?tableName=${state}&name=${selectedDevice}&days=${days}`;
      setLogs([]);
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
  }, [selectedDevice,state,days]);

  if (!selectedDevice) return <div>No device selected</div>;

  return (
    <div className="log-list">
       <h3>{selectedDevice} Device Logs (Last {days} Days)</h3>
     {loading && <div>Loading logs...</div>}
       {error && <div>{error}</div>}
  <ul>
    <li>
      <div>DEVICE</div>
      <div>STATUS</div>
      <div>TIMESTAMP</div>
      <div>NAME</div>
    </li>
    {logs.map((log) => (
      <li key={dateConverter(log.timeStamp)} onClick={() => clickedLog(log)}
      className={selectedLog === log ? 'selected' : ''}
      >       
        <div>{log.ip}</div>
        <div>{log.status}</div>
        <div>{dateConverter(log.timeStamp)}</div>
        <div>{log.name}</div>
      </li>
    ))}
  </ul>
  
</div>
  );


  // return (
  //   <div>
  //     <h3>{selectedDevice} Device Logs (Last {days} Days)</h3>
  //     {loading && <div>Loading logs...</div>}
  //     {error && <div>{error}</div>}
  //     <ul>
  //       {logs.map((log) => (
  //         <li key={log.timestamp}>
  //           <div>{log.timestamp}</div>
  //           <div>{log.ip}</div>
  //           <div>{log.status}</div>
  //           <div>{log.name}</div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default FourthQuad;
