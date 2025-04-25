import React from "react";

const Status = ({ status = "inProgress" }) => {
  if (status === "completed") return <span className="bg-[#03A229] text-white px-3 py-1 rounded-2xl">Completed</span>;
  return <span className="bg-[#F5D20E] text-white px-3 py-1 rounded-2xl">In Progress</span>;
};

export default Status;
