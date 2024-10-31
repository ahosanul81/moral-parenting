import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const currentData = payload[0].payload;
    // console.log(currentData);


    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: "10px" }}>
        <p className="label">{`Session: ${label}`}</p>
        {currentData.sessionDate && <p>Date: {`${currentData.sessionDate}`}</p>}
        {currentData.label && <p className="text-sm"><strong>{`${currentData.label}`}</strong></p>}
        
        {currentData.description && <p className="text-sm">{`${currentData.description}`}</p>}
        
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
