import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const handleClientRoute = () => {
    onclick = navigate("/client");
  };
  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={handleClientRoute}>Client Page</button>
    </div>
  );
};

export default DashboardPage;
