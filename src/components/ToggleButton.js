
import React from 'react'

const ToggleButton=({theme,toggleTheme})=>{

    return(
    <div className="form-check form-switch" style={{position: 'absolute',right:10,top:10}}>
         <input className="form-check-input" type="checkbox" role="switch" onClick={() => toggleTheme()} id="flexSwitchCheckDefault"/>
         <p style={{display:'inline'}}>{theme}</p>
      </div>
      );
}


export default ToggleButton;