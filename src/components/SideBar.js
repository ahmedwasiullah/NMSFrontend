import React, { useState } from 'react';

const SideBar = ({ states, onStateChange}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState,setState]= useState(states[0]);

  // Filter states based on search term
  const filteredTopics = states.filter(state=>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const onStateChanges=(state)=>{
    setState(state);

    onStateChange(state);
  }

  return (
    <aside className="sidebar">
      <h2>States</h2>
      <input
        type="text"
        placeholder="Search States..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '3px', width: '98%' }}
      />
   <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>

        {filteredTopics.length > 0 ? (
          filteredTopics.map((state) => (
            <li className={selectedState===state?'selected':''} key={state} onClick={() => onStateChanges(state)}>
              {state}
            </li>
          ))
        ) : (
          <li>No State found</li>
        )}
      </ul>
    </aside>
  );
};

export default SideBar;
