import React, { useState } from 'react';

const SideBar = ({ states, onStateChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter states based on search term
  const filteredTopics = states.filter(state=>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="sidebar">
      <h2>States</h2>
      <input
        type="text"
        placeholder="Search States..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <ul>
        {filteredTopics.length > 0 ? (
          filteredTopics.map((state) => (
            <li key={state} onClick={() => onStateChange(state)}>
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
