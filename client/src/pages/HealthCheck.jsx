import { useEffect, useState } from "react";
import { healthCheck } from "../services/pasteApi";

function HealthCheck() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    healthCheck()
      .then(() => setStatus("Backend is healthy "))
      .catch(() => setStatus("Backend is down "));
  }, []);

  return (
    <div>
      <h2>Health Status</h2>
      <p>{status}</p>
    </div>
  );
}

export default HealthCheck;
