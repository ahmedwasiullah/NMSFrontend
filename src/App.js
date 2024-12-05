// src/App.js
import React, { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import FirstQuad from './components/FirstQuad';
import SecondQuad from './components/SecondQuad';
import ThirdQuad from './components/ThirdQuad';
import FourthQuad from './components/FourthQuad';
import FifthQuad from './components/FifthQuad';
import './styles/global.css';
import FruitPicker from './components/FruitPicker';
import ToggleButton from './components/ToggleButton';

const App = () => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [deviceStatus, setDeviceStatus] = useState({ active: 0, inactive: 0,noStatus: 0});
  const [states,setStates]=useState([]);
  const [state,setState]=useState("");
  const [days,setDays]=useState(1);
  const baseUrl=process.env.REACT_APP_BACKEND_URL;
  const [theme, setTheme] = useState("light");

  // Function to toggle between 'light' and 'dark' theme
  const toggleTheme = () => {
    setTheme(theme==='dark'?'light':'dark');
    console.log(baseUrl);
  };


  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#333';  // Dark background
      document.body.style.color = '#E0E0E0';  // Light text
    } else {
      document.body.style.backgroundColor = '#fff';  // Light background
      document.body.style.color = 'black';  // Dark text
    }
  }, [theme]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        // Fetch data from the API
        const response = await fetch("http://localhost:8080/fetch/Tables");
        
        if (!response.ok) {
          console.log("tables fetching failed");
          throw new Error("Network response was not ok");
        }
        
        const parsedData = await response.json();

        // Assuming parsedData is an array, update the states
        console.log(parsedData[0]+" "+parsedData[1])
        setStates(parsedData);

        // Set the first state if available
        if (parsedData.length > 1) {
          setState(parsedData[1]);
        }
      } catch (err) {
        console.error("Failed to fetch states:", err);
        // Optionally handle the error, e.g., set an error state
      }
    };

    // Call the fetchStates function
    fetchStates();
  }, []); 

  const onStateChange= (currState)=>{
    console.log(currState+" state has been changed");
    setState(currState);
  }

  useEffect(() => {
    const fetchAState = async () => {
      if(state==="")return;
      setSelectedDevice("");
      //set the statesnode 
      try {
        const responseDeviceData = await fetch(`http://localhost:8080/fetch/getTableData?tableName=${state}`);
        
        if (!responseDeviceData.ok) {
          console.log("no response from table fetch");
          throw new Error("Failed to fetch device data");

        }

        const parsedDevicesData = await responseDeviceData.json();
        setDeviceStatus({
          active: parsedDevicesData.active_devices,
          inactive: parsedDevicesData.inactive_devices,
          noStatus:parsedDevicesData.no_status_devices
        });
      } catch (error) {
        console.error("Error fetching device data:", error);
        // You can optionally set an error state to show a message to the user
      }
    };

    fetchAState();  // Call the fetch function inside useEffect

  }, [state]);

  const handleSelectLog = (log) => {
    // Select device based on log info (e.g., log.deviceId)
    setSelectedDevice(log.name);

    //use the async and await 
  };

  const handleDaysChanged = (newDays) => {
    setDays(newDays);
    console.log("Selected days:", newDays); // You can perform additional logic here
  };

  return (
    <div className="dashboard">
      <SideBar states={states} onStateChange={onStateChange}/>
      <ToggleButton theme={theme} toggleTheme={toggleTheme}/>
     {/* Use the every where now */}
      <div className={`grids-container`}>
      <div className= {`main-content-${theme}`}>
        <div className={`quadrant-${theme}`}>
          <FirstQuad data={deviceStatus} />
        </div>
        <div className={`quadrant-${theme}`}>
          <SecondQuad onSelectLog={handleSelectLog} state={state}/>
        </div>
      </div>

     <div className={`central-content-${theme}`}>
     <div className={`quadrant-${theme}`}>
        <FruitPicker handleDaysChanged={handleDaysChanged} />
          <FourthQuad selectedDevice={selectedDevice} state={state} days={days}/>
        </div>
     </div>
      <div className={`footer-content-${theme}`}>
      <div className={`quadrant-${theme}`}>
          <ThirdQuad selectedDevice={selectedDevice} state={state} days={days}/>
        </div>
        <div></div>
        <div className={`quadrant-${theme}`}>
          <FifthQuad selectedDevice={selectedDevice} state={state} days={days}/>
        </div>
      </div>
      </div>
    </div>
   
  );
};

export default App;
