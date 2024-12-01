export default function FruitPicker({ handleDaysChanged }) {
    // Handle change event for the select element
    const handleChange = (event) => {
        handleDaysChanged(Number(event.target.value)); // Convert to number if necessary
    };
  
    return (
      <label>
        Past:
        <select name="selectedFruit" onChange={handleChange}>
          <option value="1">Today</option>
          <option value="7">Week</option>
          <option value="30">Month</option>
          <option value="90">3-Months</option>
          <option value="180">6-Months</option>
        </select>
      </label>
    );
  }